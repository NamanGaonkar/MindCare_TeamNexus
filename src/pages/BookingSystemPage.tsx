import BookingSystem from "@/components/BookingSystem";
import Header from "@/components/Header";

const BookingSystemPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BookingSystem />
      </main>
    </div>
  );
};

export default BookingSystemPage;
