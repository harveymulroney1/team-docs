---
layout: article
title: Invoicing and Statements
markdownpage: true
---
<a class="offset" name="invoicingandstatements"></a>
# Invoicing and Statements

- - -

<a class="offset" name="invoicelist"></a>
## Invoice List

***

The **Invoice List** gives you a comprehensive list of all Invoices ever produced. You are able to re-print or export *(as a PDF)* any of these invoices.

Find and open an invoice you wish to print. Then select either the print icon or export.

![saveprint](https://labtracdownloads.blob.core.windows.net/media/documentation%20videos/documentation%20images/saveprint.PNG "Save & Print"){: .center-block.img-responsive}

To export, click the envelope icon. Rename the Invoice, select the location you wish to save it to and click **Export**.

- - - 

<a class="offset" name="statementmanager"></a>
## Statement Manager

***

To produce your statements please follow these steps:


* Open **Statement Manager** from the contents bar

* Select the correct month in **Aged Debt Reference**

* Apply a **Date Filter** *if required*

* Choose the type of statement you wish to produce.

>**Remember**
>
> If you used consolidated invoicing **Grouped** will just show the monthly value for each consolidated invoice. **Itemised** will show a line for each job.
{: .alert.alert-info}

* Apply a **Dentist Filter** *if required*

* Select **Preview** to view statements or **Print** to print without a preview

![Statement Manager](https://labtracdownloads.blob.core.windows.net/media/documentation%20videos/documentation%20images/sm_1.PNG "Statement Manager"){: .center-block.img-responsive}

>**Remember**
>
>To email statements please see <a href="invoicing-statements#crm">CRM Studio</a>
{: .alert.alert-info}

- - -

<a class="offset" name="accountactivity"></a>
## Account Activity

***

**Account Activity** allows you to see a complete overview of any of your Dentists Accounts.

To access **Account Activity** follow these steps:

* Open **Account Activity** from the contents bar

* Select the account you wish to view from the dropdown menu and click **Refresh**

* This will show you all **Invoices** *(paid and unpaid)*, **Payments**, **Credit Notes**, **Balances** and **Aged Debt**.

---

![Account Activity](https://labtracdownloads.blob.core.windows.net/media/documentation%20videos/documentation%20images/aa_1.PNG "Account Activity"){: .center-block.img-responsive}

---

You can also **Post a Balance** in **Account Activity**;

<a name="PostingBalance"></a>

If you wish to bring an outstanding balance on an account into Labtrac you can **Post a Balance**

* In the **Post a Balance** section enter a **Description, Amount and Date** then click **Post**. 

---

![Account Activity](https://labtracdownloads.blob.core.windows.net/media/documentation%20videos/documentation%20images/aa_2.PNG "Post a Balance"){: .center-block.img-responsive}

- - -

<a class="offset" name="endofmonth"></a>
## End Of Month Guide

***

<a class="offset" name="consolidated"></a>
### Consolidated Invoices

To run your end of month tasks for consolidated invoices please follow these steps.

>**Remember**
>
>Make sure all jobs for the month are complete at this point and that you will not be completing any more jobs until the next calendar month.
{: .alert.alert-info}

* Open **Invoice Manager** from the contents bar

* Make sure the correct month is selected in the dropdown menu

* Click **Data Integrity Check** *(this will make sure there have been no errors during the month)*. This will produce 3 reports all of which should be blank. If they are not blank please contact <a href="./#labtracsupport">Labtrac Support</a>

* Click **Prepare**. This will start consolidating all of your invoices for the month. *If you have a lot of invoices for the month this process may take a few minutes.*

*  To print Invoice click **Select All** then **Preview**. You can then print invoices from here.

* To email invoice please see <a href="invoicing-statements#crm">CRM Studio</a>

* Please follow these links for **Statements**, **Invoice Export**, **Payment Entry**

- - - 

<a class="offset" name="crm"></a>
## CRM Studio
***

**CRM Studio**  is for email and MyDentist invoicing. 

+ To set up your Dentists for email see <a href="setup#email">Adding Email on a Dentist</a>

To Email Invoices, Statments, Patient Statments or Delivery Notes:

+ Open CRM Studio and click **Email**

+ This will then open a window which will list all dentists that are currently set up with email addresses in Labtrac.

+ Click on the appropriate tab for **Case Documents**, **Monthly Invoices**, or **Statements**.

>**Remember**
>
>**Case Documents** are for any document specific to a job. Such as a **Single Invoice**, **Delivery Note**, or **Patient Statement**. If you send more than one of these documents by email *(eg Single Invoice and Patient Statement)* Then both documents will be attached to a single email.
{: .alert.alert-info}

+ For Consolidated Invoices, click **Monthly Invoices**.

+ For *Statements*, click **Statements**.

+ Use the date filter in the top right select a date range. 

+ This will show all documents that fall within this period. Click **Send** in the bottom right.

+ This will produce a report which should say *X invoices sent succesfully*.

+ If you have any issues when sending emails please contact <a href="./#labtracsupport">Labtrac Support</a>.

<a class="offset" name="mydentist"></a>
### MyDentist Invoicing

MyDentist require their invoices to be sent in a certain (CSV) format. Labtrac has made this easy by introducing a **Corporate Invoicing Module**

Make sure you **Dentists** are set up for MyDentist Invocing. See <a href="setup#addingdentists">Adding a Dentist</a>

To set this up you must first map your products to the product descriptions provided by MyDentist.

+ In CRM go to **Corporate Invoicing**

+ Then **Product Mapping**

+ **Refresh Grid** This will open your product list from Labtrac.

+ Go through and select the MyDentist product description that matches your description. 

+ Once you have mapped all of your products **Save Mapping**

You are now set up and can send invoices.

+ Go to **Invoices**

+ Select the month you wish to Invoice

+ **Test Mappings** to make sure all of your Products are mapped correctly.

+ **Send**

- - - 

<a class="offset" name="invoiceexport"></a>
## Invoice Export

To export your invoices please follow these steps;

### Sage

#### Exporting Dentist Accounts

- - -

Before exporting invoices for the first time you need to export your **Dentists**.

* Open **Export** from the contents bar *(under **system utilities**)*

* Select **File Location**. This is the location on the PC where the export file will be saved. Please remember this location.

* Select the **Template**. For the Dentists the template is called **Surgeon.tpl**

* Click **Export**

* Locate the file on your PC and Import into Sage.

#### Exporting Invoices

- - -

* Open **Invoice Export** from the content bar in Labtrac

* Select **File Location** and give the file a name *(eg. March Invoices)*. This is the location on the PC where the export file will be saved. Please remember this location.

* Select the **Template**. For Invoices this is called **saget9p.tpl**

* Click **Export**

* Locate the file on your PC and Import into Sage

- - -

<a class="offset" name="backup"></a>
## Backup

- - - 

**Backup** is a program that backs up all of your Data to Labtrac's secure Cloud Server at the click of a button.

+ Once the **Backup Module** has been installed on your PC all you need to do to back up your data is click **YES** to the box asking if you would like to back up when closing **Labtrac** down. 

+ This will run a Backup procedure.

+ You will then see *Upload Succesful*. 

+ This message will then close and the upload is complete.

---
