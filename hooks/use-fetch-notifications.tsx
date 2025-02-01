import { useState, useEffect } from "react";

interface Notification {
  icon?: React.ReactNode;
  title: string;
  time: string;
  type: "error" | "warning" | "success";
  count: number;
}

export const useFetchNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un vrai appel API
    const mockNotifications: Notification[] = [
      {
        title: "Pic de commentaires négatifs sur France Bleu Nord",
        time: "Il y a 3 heures",
        type: "error",
        count: 12,
      },
      {
        title: "Augmentation des mentions négatives sur BFM Grand Lille",
        time: "Il y a 2 heures",
        type: "warning",
        count: 8,
      },
      {
        title: "Article positif publié dans La Voix du Nord",
        time: "Il y a 1 jour",
        type: "success",
        count: 3,
      },
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  }, []);

  return { notifications, loading };
};
