import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Article } from "@/types/Article";

interface DeleteArticleDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteArticle: () => void;
  selectedArticle: Article | null;
  loading: boolean;
}

const DeleteArticleDialog: React.FC<DeleteArticleDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDeleteArticle,
  selectedArticle,
  loading,
}) => (
  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-red-600">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a3 3 0 003 3h2a3 3 0 003-3V3a2 2 0 012 2v6.5l1.5 1.5a1 1 0 01-1.414 1.414L15 14.414V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.586L3.414 15.414a1 1 0 01-1.414-1.414L4 11.5V5z" clipRule="evenodd" />
            </svg>
          </div>
          Delete Article
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this article? This action cannot be undone and will permanently remove the article and all its content.
        </DialogDescription>
      </DialogHeader>

      {selectedArticle && (
        <div className="py-4 border border-red-100 rounded-lg bg-red-50 p-4">
          <div className="flex items-start gap-3">
            {selectedArticle.images && selectedArticle.images.length > 0 && (
              <img 
                src={selectedArticle.images[0]} 
                alt={selectedArticle.title}
                className="w-16 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-900 line-clamp-2">{selectedArticle.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedArticle.category} • By {selectedArticle.author}
              </p>
            </div>
          </div>
        </div>
      )}

      <DialogFooter className="gap-2">
        <Button
          variant="outline"
          onClick={() => setIsDeleteDialogOpen(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleDeleteArticle}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading && <Spinner/>}
          {loading ? "Deleting..." : "Delete Article"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteArticleDialog;
