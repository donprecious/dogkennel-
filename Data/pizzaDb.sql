USE [pizzaDb]
GO
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [DateStamp], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName], [Address]) VALUES (N'85f30072-4443-4db5-a8f1-0398df304e97', N'Admin', N'Admin', CAST(N'2019-07-22 13:56:17.830' AS DateTime), N'don0@gmail.com', 0, N'AFYSUhvy0D6sVws/Zr+vYUJSwSIEkMynwK2yQ2A1q2nupdOD5QbI9t8e3bnvxePDAA==', N'ebeddc03-2503-412c-9663-5174965cab95', NULL, 0, 0, NULL, 0, 0, N'don0@gmail.com', NULL)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [DateStamp], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName], [Address]) VALUES (N'fbd44f93-7c60-4886-9475-7fba10ad71f5', N'customer', N'customer', CAST(N'2019-07-22 14:38:37.947' AS DateTime), N'customer1@gmail.com', 0, N'AEIf6O9Ldn4x8QBLzqbh6qfcX+ktZzYbjqIglFKgjfvXFIub47ICq8qrdy5hliA4xQ==', N'f21e1322-bcc1-4768-b1d6-fd50c6e300ee', N'08051170615', 0, 0, NULL, 1, 0, N'customer1@gmail.com', NULL)
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([CustomerID], [UserID]) VALUES (1, N'fbd44f93-7c60-4886-9475-7fba10ad71f5')
SET IDENTITY_INSERT [dbo].[Customers] OFF
SET IDENTITY_INSERT [dbo].[PetCategories] ON 

INSERT [dbo].[PetCategories] ([PetCategoyID], [Name], [Description], [imageUrl]) VALUES (2, N'TOYOTA', NULL, NULL)
INSERT [dbo].[PetCategories] ([PetCategoyID], [Name], [Description], [imageUrl]) VALUES (3, N'HONDA', NULL, NULL)
INSERT [dbo].[PetCategories] ([PetCategoyID], [Name], [Description], [imageUrl]) VALUES (4, N'VOLVO', NULL, NULL)
INSERT [dbo].[PetCategories] ([PetCategoyID], [Name], [Description], [imageUrl]) VALUES (5, N'CAMRE', NULL, NULL)
SET IDENTITY_INSERT [dbo].[PetCategories] OFF
SET IDENTITY_INSERT [dbo].[Sellers] ON 

INSERT [dbo].[Sellers] ([SellerID], [UserID], [ShowEmail], [AddressableEmail]) VALUES (1, N'85f30072-4443-4db5-a8f1-0398df304e97', 1, NULL)
SET IDENTITY_INSERT [dbo].[Sellers] OFF
SET IDENTITY_INSERT [dbo].[SubCategories] ON 

INSERT [dbo].[SubCategories] ([Id], [Name], [Description], [CategoryId]) VALUES (1, N'S Series ', NULL, 2)
INSERT [dbo].[SubCategories] ([Id], [Name], [Description], [CategoryId]) VALUES (2, N'2014 Editions', NULL, 2)
INSERT [dbo].[SubCategories] ([Id], [Name], [Description], [CategoryId]) VALUES (3, N'L Series', NULL, 3)
SET IDENTITY_INSERT [dbo].[SubCategories] OFF
SET IDENTITY_INSERT [dbo].[Pets] ON 

INSERT [dbo].[Pets] ([PetID], [Name], [Description], [Amount], [SellerID], [ImgLocation], [PetCategoryID], [SubCategoryId], [Datetime], [ImgName], [SmallPrize], [MediumPrize], [LargePrize], [DateCreated]) VALUES (5, N'AASSW AA', N'fsfsfwef', CAST(800.00 AS Decimal(19, 2)), 1, N'http://res.cloudinary.com/votel/image/upload/v1563875428/Bobsax/k50n6z6jvjfoxhoe8300.png', 3, 3, CAST(N'2019-07-23 09:51:00.943' AS DateTime), N'Bobsax/k50n6z6jvjfoxhoe8300', CAST(0.00 AS Decimal(19, 2)), CAST(0.00 AS Decimal(19, 2)), CAST(0.00 AS Decimal(19, 2)), NULL)
SET IDENTITY_INSERT [dbo].[Pets] OFF
SET IDENTITY_INSERT [dbo].[Toppings] ON 

INSERT [dbo].[Toppings] ([Id], [Name], [Description]) VALUES (1, N'Nill', N'Just work')
SET IDENTITY_INSERT [dbo].[Toppings] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (2, 1, NULL, N'08051170615', 5, N'Pending', 0, CAST(0.00 AS Decimal(18, 2)), NULL, 1, N'Pick Up Location:  ffsfds 
Pick Up Date: 7/29/2019 12:00:00 AM 
 Drop off location:  dssds 
 Drop off Date   sdsf', CAST(N'2019-07-23 11:06:56.833' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (3, 1, N'Nill', N'09053321105', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, N'ssass', CAST(N'2019-07-26 22:53:47.773' AS DateTime), N'', CAST(N'2019-07-26 12:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (4, 1, N'Nill', N'09053321105', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, N'erere', CAST(N'2019-07-26 22:55:46.137' AS DateTime), N'', CAST(N'2019-07-27 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (5, 1, N'Nill', N'09053321105', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, N'loooo', CAST(N'2019-07-26 23:43:19.183' AS DateTime), N'', CAST(N'2019-07-28 12:00:00.000' AS DateTime), CAST(38.252664 AS Decimal(18, 6)), CAST(-85.758455 AS Decimal(18, 6)))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (6, 1, NULL, N'assasa', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, NULL, CAST(N'2019-07-26 23:59:32.020' AS DateTime), N'', CAST(N'2019-07-31 12:00:00.000' AS DateTime), CAST(31.549333 AS Decimal(18, 6)), CAST(-97.146669 AS Decimal(18, 6)))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (7, 1, NULL, NULL, 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, NULL, CAST(N'2019-07-27 00:00:01.293' AS DateTime), N'', CAST(N'2019-07-31 12:00:00.000' AS DateTime), CAST(39.758947 AS Decimal(18, 6)), CAST(-84.191606 AS Decimal(18, 6)))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (8, 1, N'fsdd', N'32233', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, NULL, CAST(N'2019-07-27 00:07:57.810' AS DateTime), N'', CAST(N'2019-07-30 00:00:00.000' AS DateTime), CAST(42.514456 AS Decimal(18, 6)), CAST(-83.014652 AS Decimal(18, 6)))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DeliveryAddress], [AddtionalPhoneNo], [PetId], [Status], [Quantity], [TotalPrice], [SIze], [ToppingId], [AdditionalNote], [DateTime], [ItemDetail], [PickupTime], [Latitude], [Logitude]) VALUES (9, 1, N'dssd', N'ddd', 5, N'Pending', 1, CAST(800.00 AS Decimal(18, 2)), N'', NULL, N'dsd', CAST(N'2019-07-27 00:37:42.407' AS DateTime), N'', CAST(N'2019-07-28 00:00:00.000' AS DateTime), CAST(5.554399 AS Decimal(18, 6)), CAST(5.793200 AS Decimal(18, 6)))
SET IDENTITY_INSERT [dbo].[Orders] OFF
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (N'46ca9c61-f695-4400-84c6-5cd5115ecc24', N'Admin')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (N'f4dc35f4-0b3a-489d-85ca-6e06cd5c0628', N'SuperAdmin')
INSERT [dbo].[UserRoles] ([RoleId], [UserId]) VALUES (N'46ca9c61-f695-4400-84c6-5cd5115ecc24', N'85f30072-4443-4db5-a8f1-0398df304e97')
INSERT [dbo].[UserRoles] ([RoleId], [UserId]) VALUES (N'f4dc35f4-0b3a-489d-85ca-6e06cd5c0628', N'85f30072-4443-4db5-a8f1-0398df304e97')
