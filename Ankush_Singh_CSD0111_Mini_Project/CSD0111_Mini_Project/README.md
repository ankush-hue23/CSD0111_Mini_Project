# Student Record Management System

**Ankush Singh** · BETN1AI26097 
**Ayan Khan** · BETN1AI26086 
**Aditya Kumar** · BETN1AI26071
Section F  
BTech CSE (AI & ML), Semester I · ITM University, Gwalior  
CSD0111 Project Studio I · July–December 2026

## About the project

Class Register keeps three marks for each student in one table. You can enter a student once, search by roll number and correct a mark without adding the total again. The website and Excel workbook start with the same 20 fictional students. The average is out of 100 across three subjects.

## How to run

1. Extract the complete ZIP file to a folder on your computer.
2. Open `04_Website/index.html` in Chrome or Edge. Keep the website files and the images folder together.
3. Select **Add student**, enter a unique roll number, a name and three whole marks from 0 to 100. Select **Save record**.
4. Use **Find a student** to search for part of a name or roll number. Select **Edit** to correct a mark or **Remove** to delete a row after confirming.

The site runs offline. Changes are saved in this browser when local storage is available. Open the same file in the same browser to continue. Moving the folder or clearing browser data can give you a fresh register. The summary at the top always covers the whole class.

## Files

| Folder | Contents |
| --- | --- |
| 01_Word_Documentation | Editable six-page project report and its PDF print copy |
| 02_Excel_Workbook | Project_Data.xlsx with Records, Summary, formulas and two charts |
| 03_PowerPoint | Nine slides for presenting the project |
| 04_Website | HTML, CSS, JavaScript, the sample records and the register icon |
| 05_Screenshots/Project_Screenshots | Eight captures from the working site, including the narrow layout |

## A short demonstration

1. Add **F021, Neha Joshi** with 78 in Maths, 84 in C Programming and 81 in AI & Ethics. The total is **243** and the average is **81.0**.
2. Type **f021** in the search box. Select **Edit** and change C to **90**. The total becomes **249** and the average becomes **83.0**.
3. Try adding F021 a second time. The form warns you about the duplicate. Entering 101 for a mark also shows an error.
4. Refresh the page and find F021 again. Select **Remove**, choose **Keep record** once, then repeat and confirm. The register returns to 20 students.

## Excel workbook

Open the **Records** sheet to inspect the 20 starting records. Blue text marks the editable entries. SUM adds the three marks, AVERAGE and ROUND calculate the average, and IF assigns an average band. The **Summary** sheet uses COUNTA, MAX, MIN, AVERAGE and COUNTIF. Its charts show mean marks by subject and the number of students in each average band.

**Download class CSV** at the bottom of the website exports the current class, including edited records, even when a search is active. Open the CSV in Excel to view the latest entries. Project_Data.xlsx is a separate workbook for the original 20 records. To compare a correction, update the matching mark on Records and check the formulas and charts on Summary.


