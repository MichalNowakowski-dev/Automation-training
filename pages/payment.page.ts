import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
    constructor(private page: Page) {
        
    }
    sideMenu = new SideMenuComponent(this.page)

    transferRecieverInput = this.page.getByTestId('transfer_receiver')
    transferRecieverAccNumberInput = this.page.getByTestId('form_account_to')
    transferRecieverAmountInput = this.page.getByTestId('form_amount')
    transferRecieverTitleInput = this.page.getByTestId('form_title')
    transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' })
    closeButton = this.page.getByTestId('close-button')

    messageText = this.page.getByTestId("message-text")

    async makeTransfer(recieverName: string, recieverAccountNumber: string, paymentAmount: string, paymentTitle: string): Promise<void>{
        await this.transferRecieverInput.fill(recieverName);
        await this.transferRecieverAccNumberInput.fill(
          recieverAccountNumber
        );
        await this.transferRecieverAmountInput.fill(paymentAmount);
        await this.transferRecieverTitleInput.fill(paymentTitle);
        await this.transferButton.click();
        await this.closeButton.click();
    }
  
}