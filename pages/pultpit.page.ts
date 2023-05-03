import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";
export class PulpitPage {
    constructor(private page: Page) {

    }
    sideMenu = new SideMenuComponent(this.page)

    messageText = this.page.locator("#show_messages")
    moneyValueText = this.page.locator('#money_value')

    transferRecieverInput = this.page.locator("#widget_1_transfer_receiver")
    transferAmountInput = this.page.locator("#widget_1_transfer_amount")
    transferTitleInput = this.page.locator("#widget_1_transfer_title")
    transferButton = this.page.getByRole("button", { name: "wykonaj" })
    
    topupRecieverInput = this.page.locator("#widget_1_topup_receiver")
    topupAmonutInput = this.page.locator("#widget_1_topup_amount")
    topupAgreementCheckbox = this.page.locator("#uniform-widget_1_topup_agreement span")
    topupButton = this.page.getByRole("button", { name: "doładuj telefon" })
    
    closeButton = this.page.getByTestId("close-button")
    usernameText = this.page.getByTestId("user-name")

}