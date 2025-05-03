import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SavedCard {
  id: number;
  type: string;
  last4: string;
  expiry: string;
}

export default function PaymentSection() {
  const savedCards: SavedCard[] = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payment Methods</h2>
      {savedCards.map((card) => (
        <Card key={card.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{card.type} •••• {card.last4}</p>
                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full">Add New Payment Method</Button>
    </div>
  );
}