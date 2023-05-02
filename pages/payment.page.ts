import { Page } from "@playwright/test";

export class PaymentPage {
    constructor(private page: Page) {
        
    }

    transferRecieverInput = this.page.getByTestId('transfer_receiver')
    transferRecieverAccNumberInput = this.page.getByTestId('form_account_to')
    transferRecieverAmountInput = this.page.getByTestId('form_amount')
    transferRecieverTitleInput = this.page.getByTestId('form_title')
    transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' })
    closeButton = this.page.getByTestId('close-button')

    showMessages = this.page.getByTestId("message-text")
  
}