"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  apiKey: z.string().min(10).max(500),
});

interface ApiDialogProps {
  hasApiKey: boolean;
}

const ApiDialog: React.FC<ApiDialogProps> = ({ hasApiKey }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(hasApiKey) {
      router.push("/home");
    } 
    setIsClient(true);
  }, [hasApiKey, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("API Key: ", values.apiKey);

      const res = await axios.post("/api/add-api", {
        apiKey: values.apiKey,
      });

      if(res.status === 200) {
        router.push("/home");
      }

      console.log("Response: ", res);
    } catch (error) {
      console.log(error);
    }
  }

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Dialog open={!hasApiKey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Enter your OpenAI API Key
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 py-8"
                >
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          OpenAI API Key
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Api Key" {...field} />
                        </FormControl>
                        <FormDescription className="text-black">
                          To use our service, you need to provide your OpenAI
                          API key.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiDialog;
