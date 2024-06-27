import { SetStateAction, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

interface Bookmark {
    name: string;
    long: number;
    lat: number;
  }

interface BookmarkInfoProps {
    coords: number[];
    setToggleBookmarkInfo: React.Dispatch<React.SetStateAction<boolean>>;
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const BookmarkInfo: React.FC<BookmarkInfoProps> = ({coords, setToggleBookmarkInfo, bookmarks, setBookmarks}) => {
    const [name, setName] = useState("");

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setName(e.target.value);
    };

    const handleSubmit = () => {
        const newBookmark: Bookmark = {
            name: name,
            long: coords[0],
            lat: coords[1]
          };
        setBookmarks([...bookmarks, newBookmark])
        setToggleBookmarkInfo(false)
        setName("");
    };

    const handleCancel = () => {
        setToggleBookmarkInfo(false)
        setName("")
    }

    return (
        <div className="absolute z-20 backdrop-blur-sm w-full h-full flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Bookmark</CardTitle>
                    <CardDescription>Add a name.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Bookmark name:</p>
                    <Input
                        value={name}
                        onChange={handleNameChange}
                        id="name"
                        placeholder="Perth"
                    />
                </CardContent>
                <CardFooter>
                    <div className="flex gap-1">
                        <Button onClick={handleSubmit} type="button">
                            Submit
                        </Button>
                        <Button onClick={handleCancel} type="button">
                            Cancel
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BookmarkInfo;
