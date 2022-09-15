create database lms3;
use lms3;

create table Employee(Id int primary key not null identity(1,1),Emp_Id int not null,EmployeeName varchar(30) not null,Email varchar(30),Designation varchar(20)not null,Datejoined Date,PhoneNo varchar(20) not null,InhandLeaves int ,
                  Skills varchar(100) not null, ManagerId int,pasword varchar(100) not null);

drop table Employee;
truncate table Employee;


insert into Employee(Id,pasword,EmployeeName,Designation,Age,Salary,Skills) values(1,'Ceo@123','karthik','CEO OF INDIA',20,100000,'I am Damn CEO'),(200,'Goku',1000,80000,'Manager',1),('Saitama',35,50000,'MAnager',1);

select * from Employee;

insert into Employee(Emp_Id,EmployeeName,Email,Designation,Datejoined,PhoneNo,InhandLeaves,Skills,pasword)  values(200,'karthik','bkarthik254@gmail.com','Ceo of India','2001-09-09','1000000',20,'CEO','Ceo@123');

create table Leave(Id int primary key not null identity(1,1),Emp_Id int not null,Manager_Id int not null,
leaveFromDate date not null,leaveToDAte date not null,LeaveStatus varchar(10) default 'Pending' ,leavetype varchar(20) not null,Reason varchar(100),AppliedOn date ,NoOfDays int,ManCom varchar(100));


select * from Leave;

drop table leave;

Alter table leave add ManagerId int not null;