import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DialogItem } from "./DialogItem";

export default function DropdownWithDialogItemsSolution() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);
  const focusRef = React.useRef(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  return (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="Button violet" ref={dropdownTriggerRef}>
          Actions
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="DropdownMenuContent"
        sideOffset={5}
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Items with dialog
          </DropdownMenu.Label>
          <DialogItem
            triggerChildren="Edit"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Edit this record below.
            </Dialog.Description>
            <p>…</p>
          </DialogItem>

          <DialogItem
            triggerChildren="Delete"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this record?
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>

        <DropdownMenu.Separator className="DropdownMenuSeparator" />

        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Regular items
          </DropdownMenu.Label>
          <DropdownMenu.Item className="DropdownMenuItem">
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Save
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
