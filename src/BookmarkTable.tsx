import React from "react";
import { Button } from "./components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./components/ui/table"

import { ArrowRight } from "lucide-react";
import { X } from "lucide-react";

interface Bookmark {
    name: string;
    long: number;
    lat: number;
}

interface BookmarkTableProps {
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
    mapRef: React.MutableRefObject<maplibregl.Map | null>;
}

const BookmarkTable: React.FC<BookmarkTableProps> = ({mapRef, bookmarks, setBookmarks}) => {

    const handleDelete = (toDelete: Bookmark) => {
        setBookmarks(bookmarks.filter(bookmark => bookmark !== toDelete));
    }

    const handleVisit = (toVisit: Bookmark) => {
        mapRef.current?.jumpTo({center: [toVisit.long, toVisit.lat]})
        mapRef.current?.zoomTo(8, {
            duration: 2000,
          });
          
    }

    return (
        <Table>
            <TableCaption>Bookmarks.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Longitude</TableHead>
                    <TableHead>Latitude</TableHead>
                    <TableHead>Visit</TableHead>
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {
                        bookmarks.map( (x: Bookmark, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>{x.long.toFixed(2)}</TableCell>
                                    <TableCell>{x.lat.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleVisit(x)}>
                                            <ArrowRight className="w-4"></ArrowRight>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDelete(x)}>
                                            <X className="w-4"></X>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
            </TableBody>
        </Table>

    )
}

export default BookmarkTable;