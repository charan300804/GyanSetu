
import Image from "next/image";
import Link from "next/link";
import { getLessonVideos } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, PlayCircle } from "lucide-react";

export default async function LessonsPage() {
  const videos = await getLessonVideos();

  const subjects = [...new Set(videos.map(v => v.subject))];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-2xl font-bold">Lesson Videos</h1>

      {subjects.map(subject => (
        <div key={subject}>
          <h2 className="text-xl font-semibold mt-6 mb-4">{subject}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.filter(v => v.subject === subject).map(video => (
              <Card key={video.id} className="group">
                <CardHeader className="p-0 relative">
                  <Link href="#">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      width={400}
                      height={225}
                      className="rounded-t-lg aspect-video object-cover"
                      data-ai-hint={video.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </Link>
                   {video.watched && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                            <CheckCircle className="h-3 w-3 mr-1"/> Watched
                        </Badge>
                    </div>
                   )}
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base font-medium mb-1 line-clamp-2">{video.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {video.teacher}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
