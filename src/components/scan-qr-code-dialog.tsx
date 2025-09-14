
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { QrCode, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ScanQrCodeDialog() {
  const [open, setOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setScannedData(null);
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings.",
          });
        }
      };
      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [open, toast]);

  const handleManualUpload = () => {
    // This is a placeholder for manual QR code image upload
    setScannedData('{"studentId":"1","watchedVideos":["1"]}');
    toast({
        title: "Progress Updated",
        description: "Ravi Kumar's progress has been synced.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <QrCode className="mr-2 h-4 w-4" />
          Scan Student QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Student Progress</DialogTitle>
          <DialogDescription>
            Point the camera at a student's QR code to update their progress.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {scannedData ? (
            <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg text-green-700">
                <CheckCircle className="h-16 w-16 mb-4"/>
                <p className="font-semibold text-lg">Progress Synced for Ravi Kumar</p>
            </div>
          ) : (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-secondary">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2/3 h-2/3 border-4 border-dashed border-primary/50 rounded-lg" />
                </div>
              </div>
              {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access to use this feature. You can use manual upload instead.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>
        <DialogFooter>
            {scannedData ? (
                <Button onClick={() => setOpen(false)}>Done</Button>
            ) : (
                <Button type="button" variant="outline" onClick={handleManualUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    Manual Upload
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

