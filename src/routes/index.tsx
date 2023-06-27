import { For, VoidComponent } from "solid-js";
import { Flex } from "~/components/layout/flex";
import { Grid } from "~/components/layout/grid";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress, ProgressLabel, ProgressValueLabel } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AiOutlineStar, AiFillStar } from "solid-icons/ai";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

function requiredXp(level: number): number {
    return level * 100;
}

type Task = {
    id: string;
    goalId: string;
    title: string;
    xp: number;
};

type Goal = {
    id: string;
    title: string;
    description: string;
    favorite: boolean;
    level: number;
    xp: number;
};

const goals: Goal[] = [
    {
        id: "1",
        title: "Fitness",
        description: "Build muscle and lose fat",
        favorite: true,
        level: 4,
        xp: 300,
    },
    {
        id: "2",
        title: "Programming",
        description: "Learn programming",
        favorite: false,
        level: 2,
        xp: 100,
    },
    {
        id: "3",
        title: "Reading",
        description: "Read books",
        favorite: false,
        level: 1,
        xp: 50,
    },
];

const tasks: Task[] = [
    {
        id: "1",
        goalId: "1",
        title: "Go to the gym and workout",
        xp: 10,
    },
    {
        id: "2",
        goalId: "1",
        title: "Eat healthy food",
        xp: 5,
    },
    {
        id: "3",
        goalId: "2",
        title: "Learn JavaScript",
        xp: 10,
    },
    {
        id: "4",
        goalId: "2",
        title: "Learn TypeScript",
        xp: 5,
    },
    {
        id: "5",
        goalId: "3",
        title: "Read Atomic Habits",
        xp: 10,
    },
    {
        id: "6",
        goalId: "3",
        title: "Read The Pragmatic Programmer",
        xp: 5,
    },
];

function getTask(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
}

function getGoal(id: string): Goal | undefined {
    return goals.find((goal) => goal.id === id);
}

const dailyTasks: string[] = ["1", "2", "3"];

type TaskItemProps = {
    task: Task;
};

const TaskItem: VoidComponent<TaskItemProps> = (props) => {
    return (
        <Flex flexDirection="row" justifyContent="between" alignItems="center">
            <Flex flexDirection="row" justifyContent="start" alignItems="center" class="space-x-4">
                <Checkbox id={props.task.id} />
                <Label for={props.task.id}>{props.task.title}</Label>
            </Flex>
            <Flex flexDirection="col" justifyContent="start" alignItems="end">
                <div>
                    Goal: {getGoal(props.task.goalId)?.title}
                </div>
                <div>
                    {props.task.xp} XP
                </div>
            </Flex>
        </Flex>
    );
};

type GoalItemProps = {
    goal: Goal;
};

const GoalItem: VoidComponent<GoalItemProps> = (props) => {
    return (
        <Card>
            <CardHeader>
                <Flex flexDirection="row" justifyContent="between" alignItems="start">
                    <div>
                        <CardTitle>{props.goal.title}</CardTitle>
                        <CardDescription> Level {props.goal.level} </CardDescription>
                    </div>
                    <div>
                        <button>
                            {props.goal.favorite ? <AiFillStar class="h-6 w-6" /> : <AiOutlineStar class="h-6 w-6" />}
                        </button>
                    </div>
                </Flex>
            </CardHeader>
            <CardContent>
                {props.goal.description}
            </CardContent>
            <CardFooter>
                <Progress
                    value={props.goal.xp}
                    minValue={0}
                    maxValue={requiredXp(props.goal.level)}
                    getValueLabel={({ value, max }) => `${value}/${max}XP`}
                    class="w-full space-y-1"
                >
                    <div class="flex justify-between">
                        <ProgressLabel>Working...</ProgressLabel>
                        <ProgressValueLabel />
                    </div>
                </Progress>
            </CardFooter>
        </Card>
    );
};

const Home: VoidComponent = () => {
    return (
        <>
            <main>
                <Tabs defaultValue="goals">
                    <Flex flexDirection="row" alignItems="center" justifyContent="start" class="space-x-4 p-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/alexjercan.png" />
                            <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="goals">Goals</TabsTrigger>
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        </TabsList>
                    </Flex>
                    <Separator />
                    <TabsContent value="goals">
                        <Grid cols={3} class="space-x-4 p-4">
                            <For each={goals}>
                                {(goal) => <GoalItem goal={goal} />}
                            </For>
                        </Grid>
                    </TabsContent>
                    <TabsContent value="tasks">
                        <Flex flexDirection="row" alignItems="center" justifyContent="center">
                            <Flex flexDirection="col" alignItems="start" justifyContent="start" class="w-1/2 space-y-4 p-4">
                                <For each={dailyTasks}>
                                    {(id) => {
                                        const task = getTask(id);
                                        if (task) {
                                            return <TaskItem task={task} />;
                                        }
                                    }
                                    }
                                </For>
                            </Flex>
                        </Flex>
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
};

export default Home;
