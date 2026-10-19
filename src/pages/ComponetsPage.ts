import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ComponetPage extends BasePage{
   private readonly homeIcon:Locator;
   private readonly deskTop:Locator;
   private readonly lapTopNoteBook:Locator;
   private readonly compoNents:Locator;
   private readonly tabLets:Locator;
   private readonly softWare:Locator;
   private readonly phones:Locator
   private readonly cameras:Locator;
   private readonly mp3Players:Locator;
   private readonly navItems: { name: string; locator: Locator }[];

     constructor(page:Page) {
        super(page);
        
        this.homeIcon = page.locator('ul.breadcrumb li a[href*="route=common/home"]');
        this.deskTop = page.getByRole('link', { name: 'Desktops', exact: true });
        this.lapTopNoteBook = page.getByRole('link', { name: 'Laptops & Notebooks' }).first();
        this.compoNents = page.getByRole('link', { name: 'Components' }).first();
        this.cameras = page.getByRole('link', { name: 'Cameras' }).first();
        this.mp3Players = page.getByRole('link', { name: 'MP3 Players' }).first();
        this.phones = page.getByRole('link', { name: 'Phones & PDAs' }).first();
        this.tabLets = page.getByRole('link', { name: 'Tablets' }).first();
        this.softWare = page.getByRole('link', { name: 'Software' }).first();
        

         // Array for looping validation
    this.navItems = [
      { name: "Home Icon", locator: this.homeIcon },
      { name: "Desktops", locator: this.deskTop },
      { name: "Laptops & Notebooks", locator: this.lapTopNoteBook },
      { name: "Components", locator: this.compoNents },
      { name: "Cameras", locator: this.cameras },
      { name: "MP3 Players", locator: this.mp3Players },
      { name: "Phones & PDAs", locator: this.phones },
      { name: "Tablets", locator: this.tabLets },
      { name: "Software", locator: this.softWare },
    ];
  }

    // Method to validate all nav items

 async homeIconClicked(){
    await this.page.waitForTimeout(5000)
    await this.homeIcon.click({ force: true });
 }
  async validateNavItems() {
  for (let item of this.navItems) {
    await expect(item.locator, `${item.name} should be visible`).toBeVisible();
  }

  }
}