import { getItem } from '@/utils/localStorage';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from './use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '@/components/ui/button';

export function useLocalStorageModal<T>(key: string) {
  const [data, setData] = useState<T>();
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  const loadDataFromLocalStorage = useCallback(() => {
    try {
      const stringData = getItem(key);
      if (stringData) {
        setData(JSON.parse(stringData));
        setHasData(false);
      }
    } catch {
      toast({
        title: 'Error loading data from local storage',
        description: 'Please try again by refreshing the page',
      });
    }
  }, [key, toast]);

  function resetData() {
    setData(undefined);
  }

  const checkIfDataExists = useCallback(() => {
    if (getItem(key)) {
      setHasData(true);
    }
  }, [key]);

  const localStorageModal = (
    <Dialog open={hasData} onOpenChange={setHasData}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You have data saved!</DialogTitle>
          <DialogDescription>
            The data you entered previously has been saved in your local
            storage, by clicking continue you will be able to continue where you
            left off.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 items-center">
          <Button onClick={loadDataFromLocalStorage}>Continue</Button>
          <Button onClick={() => setHasData(false)}>Start over</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  useEffect(() => {
    checkIfDataExists();
  }, [checkIfDataExists]);

  return {
    data,
    localStorageModal,
    resetData,
  };
}
