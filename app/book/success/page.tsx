import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const BookingSuccessPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Booking Success</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Booking successful. Click the button below to go back to the home
            page.
          </p>
        </CardContent>
        <CardFooter>
          <Link href={"/"}>Go to home</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingSuccessPage;
