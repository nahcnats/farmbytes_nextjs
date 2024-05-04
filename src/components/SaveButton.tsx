import { Button } from "@/components/ui/button";

interface SaveButtonProps {
    isSubmitting: boolean,
    onCancel: () => void
}

export const SaveButton = ({ isSubmitting, onCancel }: SaveButtonProps) => {
    return (
        <div className={`flex flew-row gap-x-4`}>
            <Button type="submit" className={`w-[100px] ${isSubmitting && 'opacity-60'}`}>Submit</Button>
            <Button
                type="button"
                onClick={onCancel}
                className="w-[100px] bg-destructive hover:bg-destructive hover:opacity-90"
            >
                Cancel
            </Button>
        </div>
    )
}