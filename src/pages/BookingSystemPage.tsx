import BookingSystemConnected from "@/components/BookingSystemConnected";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

const BookingSystemPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BookingSystemConnected />
      </main>
    </div>
  );
};

export default BookingSystemPage;
