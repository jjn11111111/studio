
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { exerciseData } from '@/lib/data';

const journalSchema = z.object({
  videoId: z.string().min(1, { message: 'Please select an exercise.' }),
  notes: z.string().min(1, { message: 'Please enter your comments.' }),
  isPublic: z.boolean().default(false),
});

type JournalFormValues = z.infer<typeof journalSchema>;

const allVideos = exerciseData.flatMap(unit =>
  unit.videos.map(video => ({
    value: video.id,
    label: `${unit.title}: ${video.title}`,
  }))
);

interface JournalFormProps {
  onSave: (data: JournalFormValues) => void;
  onCancel: () => void;
}

export default function JournalForm({ onSave, onCancel }: JournalFormProps) {
  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      videoId: '',
      notes: '',
      isPublic: false,
    },
  });

  const onSubmit = (data: JournalFormValues) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the exercise you completed" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allVideos.map(video => (
                    <SelectItem key={video.value} value={video.value}>
                      {video.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your physical, emotional, and visual sensations..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Make Public</FormLabel>
                <p className="text-xs text-muted-foreground">
                  Share this entry anonymously with the community.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />


        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Entry</Button>
        </div>
      </form>
    </Form>
  );
}
