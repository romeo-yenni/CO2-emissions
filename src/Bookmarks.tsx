import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "./components/ui/drawer"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "./components/ui/tooltip"
import { useToast } from "./components/ui/use-toast"
import { Button } from "./components/ui/button"
import { Bookmark } from 'lucide-react'
import { Plus } from "lucide-react"
import { ScrollArea } from "./components/ui/scroll-area"
import BookmarkTable from "./BookmarkTable"

interface Bookmark {
    name: string;
    long: number;
    lat: number;
}

interface BookMarksProps {
    setBookmarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
    mapRef: React.MutableRefObject<maplibregl.Map | null>;
}
  
const Bookmarks: React.FC<BookMarksProps> = ({ mapRef, bookmarks, setBookmarks, setBookmarkMode }) => {

    const { toast } = useToast()

    const handleAddBookmark = () => {
        setBookmarkMode(true);
        toast({
            title: "Select a location to bookmark",
            description: "Double click to select",

        })
    }

    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center" >
                    <Bookmark className="h-10 w-10" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className='h-screen top-0 left-0 right-auto mt-0 w-[500px] rounded-none'>
                <ScrollArea className="h-screen">
                    <div className='mx-auto w-full p-5'>
                        <DrawerHeader>
							<DrawerTitle>Bookmarks</DrawerTitle>
							<DrawerDescription>
								Save and load specific locations on the world map.
							</DrawerDescription>
						</DrawerHeader>
                    </div>
                    <div className="mx-auto w-full p-5 flex items-center justify-center">
                        <DrawerClose>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                            <Button onClick={handleAddBookmark} asChild >
                                                <Plus className="h-10 w-20" />
                                            </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add bookmark</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DrawerClose>
                    </div>
                    <div className="mx-auto w-full p-5">
                        <BookmarkTable mapRef={mapRef} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>

    )
}

export default Bookmarks;