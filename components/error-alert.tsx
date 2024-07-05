import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { APIError } from "@/types";

export function ErrorAlert({ errorObj }: { errorObj: APIError | undefined }) {
  if (errorObj) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{errorObj.error_type}</AlertTitle>
        <AlertDescription>{errorObj.error}</AlertDescription>
      </Alert>
    );
  }
  return <></>;
}
