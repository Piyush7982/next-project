"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import axios from "axios";

export function InputBox() {
  const [userInput, setuserInput] = useState("");
  const [fetchedUsers, setfetchedUsers] = useState(null);

  async function handleSubmit(username) {
    try {
      const response = await axios.get(`/api/admin/${username}`, {
        headers: { "Content-Type": "application/json" },
      });
      setfetchedUsers(response?.data?.Data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Command>
      <CommandInput
        onChange={async (e) => {
          setuserInput(e.target.value);
          if (userInput.length >= 3) {
            await handleSubmit(userInput);
          }
        }}
        value={userInput}
        placeholder="Search For a User..."
      />
      <CommandList>
        {fetchedUsers && fetchedUsers.length < 1 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {fetchedUsers && fetchedUsers.length >= 1 && (
          <div className="h-28">
            <CommandGroup heading="Available User">
              {fetchedUsers.map((user) => {
                return (
                  <CommandItem key={user?.id}>{user?.username}</CommandItem>
                );
              })}
              {/* <CommandItem>Calendar</CommandItem> */}
            </CommandGroup>
            {/* {/* <CommandSeparator /> */}
          </div>
        )}
      </CommandList>
    </Command>
  );
}
