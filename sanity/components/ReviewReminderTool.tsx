"use client";

import { useState, useEffect } from "react";
import { useClient } from "sanity";
import { Card, Stack, Button, Select, Text, Spinner, useToast } from "@sanity/ui";

interface Book {
  _id: string;
  title: string;
  purchaserCount: number;
}

export function ReviewReminderTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingBooks, setIsFetchingBooks] = useState(true);

  useEffect(() => {
    // Fetch all books that have associated purchasers
    client
      .fetch<Book[]>(
        `*[_type == "book" && _id in *[_type == "purchaser"].book._ref] {
          _id,
          title,
          "purchaserCount": count(*[_type == "purchaser" && book._ref == ^._id])
        } | order(title asc)`
      )
      .then((data) => {
        setBooks(data);
        setIsFetchingBooks(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setIsFetchingBooks(false);
      });
  }, [client]);

  const handleSendReminders = async () => {
    if (!selectedBook) {
      toast.push({
        status: "warning",
        title: "Please select a book",
      });
      return;
    }

    const book = books.find((b) => b._id === selectedBook);
    const confirmSend = window.confirm(
      `Are you sure you want to send review reminder emails to ${book?.purchaserCount || 0} purchaser(s) of "${book?.title}"?`
    );

    if (!confirmSend) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/send-review-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: selectedBook }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reminders");
      }

      toast.push({
        status: "success",
        title: `✅ ${data.emailsSent} email${data.emailsSent !== 1 ? "s" : ""} sent successfully!`,
      });
    } catch (error) {
      toast.push({
        status: "error",
        title: error instanceof Error ? error.message : "Failed to send reminders",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBookData = books.find((b) => b._id === selectedBook);

  return (
    <Card padding={5} style={{ maxWidth: 500, margin: "40px auto" }}>
      <Stack space={5}>
        <Stack space={3}>
          <Text size={4} weight="bold">
            📧 Send Review Reminder
          </Text>
          <Text size={2} muted>
            Send a reminder email to purchasers asking them to leave a review on Amazon.
          </Text>
        </Stack>

        {isFetchingBooks ? (
          <Card padding={4} style={{ textAlign: "center" }}>
            <Spinner muted />
            <Text size={1} muted style={{ marginTop: 10 }}>
              Loading books...
            </Text>
          </Card>
        ) : books.length === 0 ? (
          <Card padding={4} tone="caution" border>
            <Text>No books with purchasers found. Purchasers are created when someone redeems a promo code.</Text>
          </Card>
        ) : (
          <Stack space={4}>
            <Stack space={2}>
              <Text size={1} weight="medium">
                Select Book
              </Text>
              <Select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.currentTarget.value)}
                style={{ width: "100%" }}
              >
                <option value="">Choose a book...</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} ({book.purchaserCount} purchaser{book.purchaserCount !== 1 ? "s" : ""})
                  </option>
                ))}
              </Select>
            </Stack>

            {selectedBookData && (
              <Card padding={3} tone="positive" border>
                <Text size={1}>
                  📬 This will send emails to <strong>{selectedBookData.purchaserCount}</strong> purchaser
                  {selectedBookData.purchaserCount !== 1 ? "s" : ""} of &quot;{selectedBookData.title}&quot;
                </Text>
              </Card>
            )}

            <Button
              tone="primary"
              text={isLoading ? "Sending Emails..." : "Send Review Reminders"}
              onClick={handleSendReminders}
              disabled={isLoading || !selectedBook}
              style={{ width: "100%" }}
            />
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

