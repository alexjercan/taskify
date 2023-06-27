import { createSignal, For, Show, VoidComponent } from "solid-js";
import { Flex } from "~/components/layout/flex";
import { Grid } from "~/components/layout/grid";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress, ProgressLabel, ProgressValueLabel } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuGroupLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { showToast, Toaster } from "~/components/ui/toast";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { IoRefreshOutline, IoFilterOutline } from "solid-icons/io";
import { VsStarEmpty, VsStarFull } from "solid-icons/vs";

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
        title: "Go to the gym and workout for 1 hour",
        xp: 10,
    },
    {
        id: "2",
        goalId: "1",
        title: "Eat healthy food for lunch",
        xp: 5,
    },
    {
        id: "3",
        goalId: "2",
        title: "Create a Web App using JavaScript",
        xp: 10,
    },
    {
        id: "4",
        goalId: "2",
        title: "Create a HTTP Server using Rust",
        xp: 5,
    },
    {
        id: "5",
        goalId: "3",
        title: "Read one chapter of Atomic Habits",
        xp: 10,
    },
    {
        id: "6",
        goalId: "3",
        title: "Read one chapter of The Pragmatic Programmer",
        xp: 5,
    },
];

function getTask(id: string): Task {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error("You suck");
    }

    return task;
}

function getRandomElementsWithoutDuplicates<T>(list: T[], numElements: number): T[] {
    if (numElements > list.length) {
        throw new Error("Number of elements requested exceeds the length of the list.");
    }

    const copyList = list.slice();
    const randomElements = [];

    for (let i = 0; i < numElements; i++) {
        const randomIndex = Math.floor(Math.random() * copyList.length);
        const element = copyList[randomIndex];
        randomElements.push(element);
        copyList.splice(randomIndex, 1);
    }

    return randomElements;
}

function getRandomOneElementExcept<T>(list: T[], except: T[]): T {
    const copyList = list.slice();

    for (const element of except) {
        const index = copyList.indexOf(element);
        copyList.splice(index, 1);
    }

    const randomIndex = Math.floor(Math.random() * copyList.length);
    return copyList[randomIndex];
}

function getTasks(): string[] {
    return getRandomElementsWithoutDuplicates(tasks.map((task) => task.id), 3);
}

function getGoal(id: string): Goal | undefined {
    const goal = goals.find((goal) => goal.id === id);

    if (goal === undefined) {
        throw new Error("You suck");
    }

    return goal;
}

type TaskItemProps = {
    task: Task;
    completed: boolean;
    onCompleted: () => void;
    onReset: () => void;
};

const TaskItem: VoidComponent<TaskItemProps> = (props) => {
    function setTaskCompleted(completed: boolean) {
        if (completed) {
            props.onCompleted();
        }
    }

    return (
        <Flex flexDirection="row" justifyContent="between" alignItems="center">
            <Flex flexDirection="row" justifyContent="start" alignItems="center" class="space-x-4">
                <Checkbox id={props.task.id} checked={props.completed} onChange={() => setTaskCompleted(!props.completed)} />
                <Label
                    classList={{
                        "line-through": props.completed
                    }}
                    for={props.task.id}>{props.task.title}</Label>
            </Flex>
            <Flex flexDirection="row" justifyContent="start" alignItems="center" class="space-x-4">
                <Flex flexDirection="col" justifyContent="start" alignItems="end">
                    <div>
                        Goal: {getGoal(props.task.goalId)?.title}
                    </div>
                    <div>
                        {props.task.xp} XP
                    </div>
                </Flex>
                <Flex>
                    <button onClick={() => props.onReset()}>
                        <IoRefreshOutline class="h-6 w-6" />
                    </button>
                </Flex>
            </Flex>
        </Flex>
    );
};

type GoalItemProps = {
    goal: Goal;
    onFavorite: () => void;
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
                        <button onClick={() => props.onFavorite()}>
                            {props.goal.favorite ? <VsStarFull class="h-6 w-6" /> : <VsStarEmpty class="h-6 w-6" />}
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

type GoalsProps = {
    goals: Goal[];
    onFavorite: (goal: Goal) => void;
};

type GoalsFavorites = "all" | "yes" | "no";

const Goals: VoidComponent<GoalsProps> = (props) => {
    const [favorites, setFavorites] = createSignal<GoalsFavorites>("all");

    return (
        <>
            <Flex flexDirection="row" justifyContent="between" alignItems="center" class="p-4">
                <h2 class="text-2xl font-bold">Goals</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <IoFilterOutline class="h-6 w-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-48">
                        <DropdownMenuGroup>
                            <DropdownMenuGroupLabel>Favorites</DropdownMenuGroupLabel>
                            <DropdownMenuRadioGroup value={favorites()} onChange={setFavorites}>
                                <DropdownMenuRadioItem value="all">Show All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="yes">Show Favorites</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="no">Show Others</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Flex>
            <Grid cols={3} class="space-x-4 p-4">
                <For each={props.goals}>
                    {(goal, index) =>
                        <Show when={favorites() === "all" || (favorites() === "yes" && goal.favorite) || (favorites() === "no" && !goal.favorite)}>
                            <GoalItem goal={props.goals[index()]} onFavorite={() => props.onFavorite(goal)} />
                        </Show>
                    }
                </For>
            </Grid>
        </>
    );
};

type TasksProps = {
    tasks: Task[];
    completed: boolean[];
    onCompleted: (index: number) => void;
    onReset: (index: number) => void;
};

const Tasks: VoidComponent<TasksProps> = (props) => {
    return (
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
            <Flex flexDirection="col" alignItems="start" justifyContent="start" class="w-1/2 space-y-4 p-4">
                <For each={props.tasks}>
                    {(_, index) => <TaskItem task={props.tasks[index()]} completed={props.completed[index()]} onCompleted={() => props.onCompleted(index())} onReset={() => props.onReset(index())} />}
                </For>
            </Flex>
        </Flex>
    );
};

const Home: VoidComponent = () => {
    const initialTasks = getTasks();
    const [dailyTasks, setDailyTasks] = createSignal<string[]>(initialTasks);
    const [completed, setCompleted] = createSignal<boolean[]>(initialTasks.map(() => false));
    const [userGoals, setUserGoals] = createSignal<Goal[]>(goals);

    function completeTask(index: number) {
        const task = getTask(dailyTasks()[index]);

        showToast({
            title: "Task completed",
            description: `You have completed the task ${task.title} and gained ${task.xp} XP for ${getGoal(task.goalId)?.title}!`,
        });

        setCompleted((completed) => {
            completed[index] = true;
            return [...completed];
        });

        setUserGoals((goals) => {
            const goal = getGoal(task.goalId);

            goal.xp += task.xp;

            const index = goals.findIndex((g) => g.id === goal.id);
            goals[index] = goal;
            return [...goals];
        });
    }

    function resetTask(index: number) {
        const newIndex = getRandomOneElementExcept(tasks.map((task) => task.id), dailyTasks());

        setDailyTasks((tasks) => {
            tasks[index] = newIndex;
            return [...tasks];
        });

        setCompleted((completed) => {
            completed[index] = false;
            return [...completed];
        });
    }

    function favoriteGoal(goal: Goal) {
        goal.favorite = !goal.favorite;

        setUserGoals((goals) => {
            const index = goals.findIndex((g) => g.id === goal.id);
            goals[index] = goal;
            return [...goals];
        });
    }

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
                        <ModeToggle />
                    </Flex>
                    <Separator />
                    <TabsContent value="goals">
                        <Goals goals={userGoals()} onFavorite={favoriteGoal} />
                    </TabsContent>
                    <TabsContent value="tasks">
                        <Tasks
                            tasks={dailyTasks().map((id) => getTask(id))}
                            completed={completed()}
                            onCompleted={completeTask}
                            onReset={resetTask}
                        />
                    </TabsContent>
                </Tabs>
                <Toaster />
            </main>
        </>
    );
};

export default Home;
