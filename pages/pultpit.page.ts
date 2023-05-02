import { Page } from "@playwright/test";
export class PulpitPage {
    constructor(private page: Page) {

    }
    showMessages = this.page.locator("#show_messages")

    transferRecieverInput = this.page.locator("#widget_1_transfer_receiver")
    transferAmountInput = this.page.locator("#widget_1_transfer_amount")
    transferTitleInput = this.page.locator("#widget_1_transfer_title")
    transferButton = this.page.getByRole("button", { name: "wykonaj" })
    
    topupReciever = this.page.locator("#widget_1_topup_receiver")
    topupAmonut = this.page.locator("#widget_1_topup_amount")
    topupAgreementCheckbox = this.page.locator("#uniform-widget_1_topup_agreement span")
    topupButton = this.page.getByRole("button", { name: "doładuj telefon" })
    
    closeButton = this.page.getByTestId("close-button")

}