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
  
}