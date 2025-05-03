import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-sm text-muted-foreground">
                Receive updates about your order status
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Promotions</p>
              <p className="text-sm text-muted-foreground">
                Get notified about special offers and discounts
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-muted-foreground">
                Subscribe to our weekly newsletter
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}