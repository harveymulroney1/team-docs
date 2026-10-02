---
layout: article
title: System Settings
markdownpage: true
---
<a class="offset" name="settings"></a>
# Settings & More

---

<a class="offset" name="systemsettings"></a>
## System Settings

- - - 

System settings are used to customise the way Labtrac will work for you. This section outlines the different settings that can be used and the effect they will have on the way Labtrac will work. These can be accessed by double clicking System Settings in the content bar.

In the new window there will be 7 tabs.

+ [Lab Details](#labdetails)
+ [System Options](#systemoptions)
+ [Dentist](#dentist)
+ [Financial](#financial)
+ [Order Enclosures](#orderenclosures)
+ [Footnotes](#footnotes)
+ [Custom Reports](#customreports)

- - -

<a class="offset" name="labdetails"></a>
### Lab Details

- - -

**Lab Details** will hold all the Lab information. The **Name**, **Address**, **Phone Number**, and **MHRA Number**. 

It will also show the **Last Order Number** and **Last Delivery Number**. You can change these if necessary.

- - -

<a class="offset" name="systemoptions"></a>
### System Options

- - - 

<a class="offset" name="order"></a>
#### Order 


Using the Order section you can set your default options for when you are entering a job.

The options are;

- *Include Pan No* -  if checked Labtrac won't allow you to enter a job without entering a **Pan Number**.

- *Check if Patient is Already on the System* - If the patient name, that you are entering, is already on the system for the same Dentist **Labtrac** will prompt you to view the previous case before you **Launch** the job. 

- *Price Final Stage Only* - If this is selected when entering <a href="setup#stagework">Stage Work</a> **Labtrac** will ignore the prices on all but the last stage. If you wouild like a total price for all stages then leave this unticked.

- *Job Ticket by Batch* - Stops the job ticket printing and disables the prompt - allowing you to print job tickets by batch whenever you choose.

- *Disable Work Ticket Prompt* - Disables the prompt to print a work ticket when you **Launch** a job.

- - - 

<a class="offset" name="invoicing"></a>
#### Invoicing

Using the Invoicing section you can set your default invoicing options.

The options are;

- *Apply Discount to Jobs* - With this selected any volume discounts entered will be applied on your jobs.

- *Print Prices on Delivery Notes* - Using this you can select whether or not prices are shown on the **Delivery Notes**

- *Print Delivery Note on A5 Paper* - Using this you can to print on A5 paper rather than the default A4.

- *Print Invoice on A5 Paper* - Using this you can to print on A5 paper rather than the default A4.

- *Export to External Accounts* - Select here if you wish to export your invoices to an external accounts package. Sage, Xero and Quickbooks Online are currently supported, if you have another accounts system that you would like integrated please contact <a href="./#labtracsupport">Labtrac Support</a>

- - - 

<a class="offset" name="printing"></a>
#### Printing

- *Print Invoice* - If selected an **Invoice** will automatically print when a job is completed.

- *Print Delivery Note* - If selected a **Delivery Note** will automatically print when a job is completed.

- *Print Patient Statement* - If selected a **Patient Statement** will automatically print when a job is completed.

- *On Approval Notes* - If selected an **On Approval Note** will automatically print when a job is sent out on approval. See <a href="setup#stagework">Stage Work</a>.

If these are not selected you will receive a prompt on completion asking if you wish to print any of the above documents.

- - - 


<a class="offset" name="dentist"></a>
## Dentist

---

+ **Invoice on Delivery** 

	- If this is set to **YES** the system will produce a *Single Invoice* with every completed job.

	- If this is set to **NO** then the completed job will be added to a *Consolidated Invoice* for preparing and printing at the month end.


+ **Copy of Invoice sent to Principal**

	- If this is set to **YES** this means that, for each Associate Dentist (non Principal) the designated Principal will receive a copy of the Associate's invoice.

	- If this is set to **NO** the system will not produce a copy of the Associate's invoice to be sent to the Principal.

+ **Discount Shown on Invoice** 

	- If this is set to **YES** then the value of of the discount offered will be shown on the invoice.

	- If this is set to **NO** the discount will not be shown on the invoice.

>**Remember**
>
>The value exported to an external accounts package will be the gross value. Discount will not be included.
{: .alert.alert-info}

<a name="Analysis"></a>
+ **Analysis**

	- The analysis boxes can be set to whatever you like. *EG. Sales Area, Run Sequence etc.
	
>**Remember**
>
>If you do work for MyDentist Analysis box 4 and 5 must be set to MyDentist Lab ID and Dentist GDC number respectivley.
{: .alert.alert-info}

+ **Nominal Code**

	- This is the default nominal code in the external accounts package to which all sales values are assigned.

+ **Payment Details**

	- The default details entered in this section will be placed on any *new* Dentist record automatically. This can then be amended on an individual Dentist record if required.

	- **Days** - The days to be shown on the invoice by which the payment is due.

	- **Terms** - The payment terms to be shown on the invoice.

<a name="SettlementDetails"></a>
+ **Settlement Details** 

	- The default details entered in this section will be placed on any new Dentist record automatically. They can then be amended on the Dentist Details page as required.

	- **Days** - The number of days within which the settlement discount will apply.

	- **Terms** - The settlement terms to be shown on the invoice.
	
+ **Contact**
	
	- The Contact fields can be set to record any information you like. Box 1 and 2 are set up for you, the rest are free form boxes to be filled in with any information you may require.
	
- - -

<a class="offset" name="financial"></a>
## Financial

- - - 

The Laboratories bank details can be added here but these details are **not used** within the system. These are purely for your reference.

+ **Bank Name** 

	- Name of Laboratory's bank - up to 50 characters.

+ **Bank Address**

	- When entering the bank address details the **CTRL** and **Enter** keys need to be pressed together to start a new line.

+ **Sort Code** 

	- The banks sort code needs to be entered in the format **nn-nn-nn**.

+ **Account Number** 

	- The Labortatory's account number at the bank.

+ **Account Name**

	- The name of the Laboratory's bank account.

+ **Export Accounts To**

	- If you use an external accounts package (Sage etc) select from the dropdown list to select the system which the system invoice details are to be exported.

+ **Last Invoice Number**

	- Numeric or aplha/numeric field of up to 10 characters; the numeric part of which will be incremented each time an invoice is produced. **eg. I00001**.

+ **Last Credit Number** 

	- Numeric or alpha/numeric field of up to 10 characters, the numeric part of which will be incremented each time a credit is raised. **eg. C00001**.

+ **Last Transaction Number**

	- This field cannot be amended, it displays the last financial number.
	
- - -

<a class="offset" name="orderenclosures"></a>
## Order Enclosures

- - - 
Here you can enter anything you may receive with a job. You can then log what you have received with a case when entering the job.

- - -

<a class="offset" name="footnotes"></a>
## Footnotes

- - - 

Enter any information that you would like to be included in the footnotes of a document.

>**Remember**
>
>CTRL + Enter will give you a new line.
{: .alert.alert-info}

- - - 

<a class="offset" name="customreports"></a>
## Custom Reports

---

Custom Reports gives you an alternative version of anyone of our reports. We recommend speaking to <a href="./#labtracsupport">Labtrac Support</a> before using these.

- - -

<a class="offset" name="usermanager"></a>
## User Manager

---

The **User Manager** allows you to set up accounts for different members of staff with different levels of security. Allowing them to see as much or as little information as you like.

To set up a new user follow these steps:

* Open **User Manager** from the contents bar

* Click **Add**

* Enter **Name**, **Initials**, **Security Level** (see below) and **Password**

* Click **Ok**

This user is now set up and can log onto Labtrac using their **Username** and **Password**.

- - - 

<a class="offset" name="security"></a>
### Security Levels

- - -

1 - Can only add, amend and complete **Jobs** (No financial information shown)

3 - Can only add, amend and complete **Jobs** (Financial information shown)

5 - Can add **Jobs**, **Products**, **Materials** and **Dentists**. No access to financial information (**Invoices**, **Statements**, **Payments** etc). Cannot delete **Dentist**/**Products**/**Materials**

7 - Access to all information with the exception of **System Settings** and **User Manager**

9 - **System Administrator** with total access

- - -

<a class="offset" name="diary"></a>
## Diary

- - -

The **Diary** in Labtrac is way for you to add Lab closures and Bank holidays. When entering a job in Labtrac it will then take the dates you are closed into account.

To add information to the **Diary** follow these steps;

* Open **Diary** from the contents bar

* Select the date that you wish to enter a closure or holiday and click **Add**

* Enter a **Subject**, (**Type** and **Resource** *if required*)

* Enter the **Start Time** and **End Time**

* Add a **Description** *if required*

* Click **OK**

This will then add the dates into the **Diary** and Labtrac will give you a warning if you attempt to book a job out during those dates.

- - -
