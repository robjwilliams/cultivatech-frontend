import { useEffect, useState, ChangeEvent } from "react";

interface UseFormOptions {
  initial: Record<string, any>;
}

interface UseFormReturn {
  inputs: Record<string, any>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  clearForm: () => void;
}

export default function useForm({
  initial = {},
}: UseFormOptions): UseFormReturn {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState<Record<string, any>>(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { value, name, type } = e.target;
    let parsedValue: string | number | File[] = value;

    if (type === "number") {
      parsedValue = parseInt(value, 10);
    }
    if (type === "file" && e.target instanceof HTMLInputElement) {
      parsedValue = [e.target.files![0]];
    }
    setInputs({
      // Copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  // Return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
