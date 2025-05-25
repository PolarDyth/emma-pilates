import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Timetable() {
  const timetableData = [
    {
      day: "monday",
      displayName: "Monday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "5:30 - 6:30 PM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "7:00 - 8:00 PM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
    {
      day: "tuesday",
      displayName: "Tuesday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "5:30 - 6:30 PM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "7:00 - 8:00 PM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
    {
      day: "wednesday",
      displayName: "Wednesday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "5:30 - 6:30 PM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "7:00 - 8:00 PM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
    {
      day: "thursday",
      displayName: "Thursday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "5:30 - 6:30 PM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "7:00 - 8:00 PM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
    {
      day: "friday",
      displayName: "Friday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "5:30 - 6:30 PM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
    {
      day: "saturday",
      displayName: "Saturday",
      classes: [
        {
          time: "9:00 - 10:00 AM",
          level: "Beginner",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "10:30 - 11:30 AM",
          level: "Intermediate",
          classType: "Group Class",
          spotsAvailable: 8,
        },
        {
          time: "12:00 - 1:00 PM",
          level: "Advanced",
          classType: "Group Class",
          spotsAvailable: 8,
        },
      ],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 border-green-200";
      case "Intermediate":
        return "bg-blue-50 border-blue-200";
      case "Advanced":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getLevelTextColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-700";
      case "Intermediate":
        return "text-blue-700";
      case "Advanced":
        return "text-purple-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <section id="timetable" className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto">
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Schedule
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
              Class Timetable
            </h2>
            <p className="text-lg text-muted-foreground">
              Find a class that fits your schedule and experience level. No
              online booking required - simply contact me to reserve your spot.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Tabs defaultValue="monday" className="w-full">
              {" "}
              <div className="border-b">
                <div className="container mx-auto p-0">
                  <TabsList className="justify-start w-full h-auto p-0 bg-transparent">
                    {timetableData.map((dayData) => (
                      <TabsTrigger
                        key={dayData.day}
                        value={dayData.day}
                        className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-all duration-200"
                      >
                        {dayData.displayName}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>{" "}
              {timetableData.map((dayData) => (
                <TabsContent
                  key={dayData.day}
                  value={dayData.day}
                  className="p-6 animate-in fade-in-50 duration-300"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dayData.classes.map((classInfo, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getLevelColor(
                          classInfo.level
                        )}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{classInfo.time}</span>
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded-full bg-white ${getLevelTextColor(
                              classInfo.level
                            )}`}
                          >
                            {classInfo.level}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {classInfo.classType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {classInfo.spotsAvailable} spots available
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Private 1-to-1 sessions are available by appointment. Please
              contact me to schedule.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="#contact">Contact for Booking</Link>
              </Button>
              <Button asChild>
                <Link href="/timetable">View Full Timetable</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
