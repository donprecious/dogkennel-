
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/22/2019 14:19:19
-- Generated from EDMX file: G:\ProJects\pizzaKennel\bobbySaxyKennel\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [khaleejt_pizzadb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_Customer_Users]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Customers] DROP CONSTRAINT [FK_Customer_Users];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_Logins_dbo_Users_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Logins] DROP CONSTRAINT [FK_dbo_Logins_dbo_Users_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_UserClaims_dbo_Users_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserClaims] DROP CONSTRAINT [FK_dbo_UserClaims_dbo_Users_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemOptions_Pets]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemOptions] DROP CONSTRAINT [FK_ItemOptions_Pets];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemSize_Pets]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemSize] DROP CONSTRAINT [FK_ItemSize_Pets];
GO
IF OBJECT_ID(N'[dbo].[FK_Orders_Customers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Customers];
GO
IF OBJECT_ID(N'[dbo].[FK_Orders_Pets]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Pets];
GO
IF OBJECT_ID(N'[dbo].[FK_Orders_Toppings]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Toppings];
GO
IF OBJECT_ID(N'[dbo].[FK_Pets_PetCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pets] DROP CONSTRAINT [FK_Pets_PetCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_Pets_Seller]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pets] DROP CONSTRAINT [FK_Pets_Seller];
GO
IF OBJECT_ID(N'[dbo].[FK_Pets_SubCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pets] DROP CONSTRAINT [FK_Pets_SubCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_PetViews_Pets]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PetViews] DROP CONSTRAINT [FK_PetViews_Pets];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaMessage_Customer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaMessages] DROP CONSTRAINT [FK_QuotaMessage_Customer];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaMessage_Seller]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaMessages] DROP CONSTRAINT [FK_QuotaMessage_Seller];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaReply_QuotaMessage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaReplies] DROP CONSTRAINT [FK_QuotaReply_QuotaMessage];
GO
IF OBJECT_ID(N'[dbo].[FK_Seller_Users]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Sellers] DROP CONSTRAINT [FK_Seller_Users];
GO
IF OBJECT_ID(N'[dbo].[FK_SubCategory_PetCategories]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[SubCategory] DROP CONSTRAINT [FK_SubCategory_PetCategories];
GO
IF OBJECT_ID(N'[dbo].[FK_UserRoles_Roles]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Roles];
GO
IF OBJECT_ID(N'[dbo].[FK_UserRoles_Users]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Users];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[About]', 'U') IS NOT NULL
    DROP TABLE [dbo].[About];
GO
IF OBJECT_ID(N'[dbo].[C__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[C__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[Contacts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Contacts];
GO
IF OBJECT_ID(N'[dbo].[Customers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Customers];
GO
IF OBJECT_ID(N'[dbo].[Faq]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Faq];
GO
IF OBJECT_ID(N'[dbo].[ItemOptions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemOptions];
GO
IF OBJECT_ID(N'[dbo].[ItemSize]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemSize];
GO
IF OBJECT_ID(N'[dbo].[Logins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Logins];
GO
IF OBJECT_ID(N'[dbo].[Orders]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Orders];
GO
IF OBJECT_ID(N'[dbo].[PetCategories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PetCategories];
GO
IF OBJECT_ID(N'[dbo].[Pets]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Pets];
GO
IF OBJECT_ID(N'[dbo].[PetViews]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PetViews];
GO
IF OBJECT_ID(N'[dbo].[Policy]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Policy];
GO
IF OBJECT_ID(N'[dbo].[QuotaMessages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuotaMessages];
GO
IF OBJECT_ID(N'[dbo].[QuotaReplies]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuotaReplies];
GO
IF OBJECT_ID(N'[dbo].[Roles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Roles];
GO
IF OBJECT_ID(N'[dbo].[Sellers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sellers];
GO
IF OBJECT_ID(N'[dbo].[SubCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SubCategory];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[Toppings]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Toppings];
GO
IF OBJECT_ID(N'[dbo].[UserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserClaims];
GO
IF OBJECT_ID(N'[dbo].[UserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserRoles];
GO
IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Abouts'
CREATE TABLE [dbo].[Abouts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [About1] varchar(max)  NULL
);
GO

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'Contacts'
CREATE TABLE [dbo].[Contacts] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Message] varchar(1000)  NOT NULL,
    [email] varchar(50)  NOT NULL,
    [Achieved] bit  NOT NULL,
    [DateStamp] datetime  NOT NULL,
    [FullName] varchar(50)  NOT NULL
);
GO

-- Creating table 'Customers'
CREATE TABLE [dbo].[Customers] (
    [CustomerID] int IDENTITY(1,1) NOT NULL,
    [UserID] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'Faqs'
CREATE TABLE [dbo].[Faqs] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Faq1] varchar(max)  NULL
);
GO

-- Creating table 'ItemOptions'
CREATE TABLE [dbo].[ItemOptions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(500)  NULL,
    [Description] varchar(5000)  NULL,
    [Price] decimal(18,2)  NULL,
    [ItemId] int  NULL
);
GO

-- Creating table 'ItemSizes'
CREATE TABLE [dbo].[ItemSizes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(500)  NULL,
    [Description] varchar(5000)  NULL,
    [Price] decimal(18,2)  NULL,
    [ItemId] int  NULL
);
GO

-- Creating table 'Logins'
CREATE TABLE [dbo].[Logins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'Orders'
CREATE TABLE [dbo].[Orders] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CustomerId] int  NULL,
    [DeliveryAddress] varchar(500)  NULL,
    [AddtionalPhoneNo] varchar(50)  NULL,
    [PetId] int  NULL,
    [Status] varchar(50)  NULL,
    [Quantity] int  NULL,
    [TotalPrice] decimal(18,2)  NULL,
    [SIze] varchar(50)  NULL,
    [ToppingId] int  NULL,
    [AdditionalNote] varchar(max)  NULL,
    [DateTime] datetime  NULL,
    [ItemDetail] varchar(max)  NULL,
    [PickupTime] datetime  NULL
);
GO

-- Creating table 'PetCategories'
CREATE TABLE [dbo].[PetCategories] (
    [PetCategoyID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(30)  NOT NULL,
    [Description] varchar(300)  NULL
);
GO

-- Creating table 'Pets'
CREATE TABLE [dbo].[Pets] (
    [PetID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(500)  NOT NULL,
    [Description] varchar(500)  NOT NULL,
    [Amount] decimal(19,2)  NOT NULL,
    [SellerID] int  NOT NULL,
    [ImgLocation] varchar(max)  NOT NULL,
    [PetCategoryID] int  NOT NULL,
    [SubCategoryId] int  NULL,
    [Datetime] datetime  NULL,
    [ImgName] varchar(200)  NOT NULL,
    [SmallPrize] decimal(19,2)  NULL,
    [MediumPrize] decimal(19,2)  NULL,
    [LargePrize] decimal(19,2)  NULL,
    [DateCreated] datetime  NULL
);
GO

-- Creating table 'PetViews'
CREATE TABLE [dbo].[PetViews] (
    [PetID] int  NOT NULL,
    [NoOfViews] int  NOT NULL
);
GO

-- Creating table 'Policies'
CREATE TABLE [dbo].[Policies] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Policy1] varchar(max)  NULL
);
GO

-- Creating table 'QuotaMessages'
CREATE TABLE [dbo].[QuotaMessages] (
    [QuotaID] int IDENTITY(1,1) NOT NULL,
    [CustomerEmail] varchar(50)  NOT NULL,
    [PhoneNo] varchar(50)  NULL,
    [Message] varchar(1000)  NOT NULL,
    [SellerID] int  NOT NULL,
    [CustomerID] int  NULL,
    [DateTime] datetime  NOT NULL,
    [Archieved] bit  NOT NULL,
    [petId] int  NULL
);
GO

-- Creating table 'QuotaReplies'
CREATE TABLE [dbo].[QuotaReplies] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Message] varchar(max)  NOT NULL,
    [DateTime] datetime  NOT NULL,
    [QuotaID] int  NOT NULL
);
GO

-- Creating table 'Roles'
CREATE TABLE [dbo].[Roles] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'Sellers'
CREATE TABLE [dbo].[Sellers] (
    [SellerID] int IDENTITY(1,1) NOT NULL,
    [UserID] nvarchar(128)  NOT NULL,
    [ShowEmail] bit  NOT NULL,
    [AddressableEmail] varchar(50)  NULL
);
GO

-- Creating table 'SubCategories'
CREATE TABLE [dbo].[SubCategories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(50)  NULL,
    [Description] varchar(500)  NULL,
    [CategoryId] int  NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'Toppings'
CREATE TABLE [dbo].[Toppings] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(50)  NULL,
    [Description] varchar(500)  NULL
);
GO

-- Creating table 'UserClaims'
CREATE TABLE [dbo].[UserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL
);
GO

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] nvarchar(128)  NOT NULL,
    [FirstName] nvarchar(max)  NULL,
    [LastName] nvarchar(max)  NULL,
    [DateStamp] datetime  NOT NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [LockoutEndDateUtc] datetime  NULL,
    [LockoutEnabled] bit  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [UserName] nvarchar(256)  NOT NULL,
    [Address] nvarchar(max)  NULL
);
GO

-- Creating table 'UserRoles'
CREATE TABLE [dbo].[UserRoles] (
    [Roles_Id] nvarchar(128)  NOT NULL,
    [Users_Id] nvarchar(128)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Abouts'
ALTER TABLE [dbo].[Abouts]
ADD CONSTRAINT [PK_Abouts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [ID] in table 'Contacts'
ALTER TABLE [dbo].[Contacts]
ADD CONSTRAINT [PK_Contacts]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [CustomerID] in table 'Customers'
ALTER TABLE [dbo].[Customers]
ADD CONSTRAINT [PK_Customers]
    PRIMARY KEY CLUSTERED ([CustomerID] ASC);
GO

-- Creating primary key on [Id] in table 'Faqs'
ALTER TABLE [dbo].[Faqs]
ADD CONSTRAINT [PK_Faqs]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ItemOptions'
ALTER TABLE [dbo].[ItemOptions]
ADD CONSTRAINT [PK_ItemOptions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ItemSizes'
ALTER TABLE [dbo].[ItemSizes]
ADD CONSTRAINT [PK_ItemSizes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'Logins'
ALTER TABLE [dbo].[Logins]
ADD CONSTRAINT [PK_Logins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
GO

-- Creating primary key on [Id] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [PK_Orders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [PetCategoyID] in table 'PetCategories'
ALTER TABLE [dbo].[PetCategories]
ADD CONSTRAINT [PK_PetCategories]
    PRIMARY KEY CLUSTERED ([PetCategoyID] ASC);
GO

-- Creating primary key on [PetID] in table 'Pets'
ALTER TABLE [dbo].[Pets]
ADD CONSTRAINT [PK_Pets]
    PRIMARY KEY CLUSTERED ([PetID] ASC);
GO

-- Creating primary key on [PetID] in table 'PetViews'
ALTER TABLE [dbo].[PetViews]
ADD CONSTRAINT [PK_PetViews]
    PRIMARY KEY CLUSTERED ([PetID] ASC);
GO

-- Creating primary key on [Id] in table 'Policies'
ALTER TABLE [dbo].[Policies]
ADD CONSTRAINT [PK_Policies]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [QuotaID] in table 'QuotaMessages'
ALTER TABLE [dbo].[QuotaMessages]
ADD CONSTRAINT [PK_QuotaMessages]
    PRIMARY KEY CLUSTERED ([QuotaID] ASC);
GO

-- Creating primary key on [ID] in table 'QuotaReplies'
ALTER TABLE [dbo].[QuotaReplies]
ADD CONSTRAINT [PK_QuotaReplies]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [Id] in table 'Roles'
ALTER TABLE [dbo].[Roles]
ADD CONSTRAINT [PK_Roles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [SellerID] in table 'Sellers'
ALTER TABLE [dbo].[Sellers]
ADD CONSTRAINT [PK_Sellers]
    PRIMARY KEY CLUSTERED ([SellerID] ASC);
GO

-- Creating primary key on [Id] in table 'SubCategories'
ALTER TABLE [dbo].[SubCategories]
ADD CONSTRAINT [PK_SubCategories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [Id] in table 'Toppings'
ALTER TABLE [dbo].[Toppings]
ADD CONSTRAINT [PK_Toppings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UserClaims'
ALTER TABLE [dbo].[UserClaims]
ADD CONSTRAINT [PK_UserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Roles_Id], [Users_Id] in table 'UserRoles'
ALTER TABLE [dbo].[UserRoles]
ADD CONSTRAINT [PK_UserRoles]
    PRIMARY KEY CLUSTERED ([Roles_Id], [Users_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserID] in table 'Customers'
ALTER TABLE [dbo].[Customers]
ADD CONSTRAINT [FK_Customer_Users]
    FOREIGN KEY ([UserID])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Customer_Users'
CREATE INDEX [IX_FK_Customer_Users]
ON [dbo].[Customers]
    ([UserID]);
GO

-- Creating foreign key on [CustomerId] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [FK_Orders_Customers]
    FOREIGN KEY ([CustomerId])
    REFERENCES [dbo].[Customers]
        ([CustomerID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Orders_Customers'
CREATE INDEX [IX_FK_Orders_Customers]
ON [dbo].[Orders]
    ([CustomerId]);
GO

-- Creating foreign key on [CustomerID] in table 'QuotaMessages'
ALTER TABLE [dbo].[QuotaMessages]
ADD CONSTRAINT [FK_QuotaMessage_Customer]
    FOREIGN KEY ([CustomerID])
    REFERENCES [dbo].[Customers]
        ([CustomerID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuotaMessage_Customer'
CREATE INDEX [IX_FK_QuotaMessage_Customer]
ON [dbo].[QuotaMessages]
    ([CustomerID]);
GO

-- Creating foreign key on [ItemId] in table 'ItemOptions'
ALTER TABLE [dbo].[ItemOptions]
ADD CONSTRAINT [FK_ItemOptions_Pets]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[Pets]
        ([PetID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemOptions_Pets'
CREATE INDEX [IX_FK_ItemOptions_Pets]
ON [dbo].[ItemOptions]
    ([ItemId]);
GO

-- Creating foreign key on [ItemId] in table 'ItemSizes'
ALTER TABLE [dbo].[ItemSizes]
ADD CONSTRAINT [FK_ItemSize_Pets]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[Pets]
        ([PetID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemSize_Pets'
CREATE INDEX [IX_FK_ItemSize_Pets]
ON [dbo].[ItemSizes]
    ([ItemId]);
GO

-- Creating foreign key on [UserId] in table 'Logins'
ALTER TABLE [dbo].[Logins]
ADD CONSTRAINT [FK_dbo_Logins_dbo_Users_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_Logins_dbo_Users_UserId'
CREATE INDEX [IX_FK_dbo_Logins_dbo_Users_UserId]
ON [dbo].[Logins]
    ([UserId]);
GO

-- Creating foreign key on [PetId] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [FK_Orders_Pets]
    FOREIGN KEY ([PetId])
    REFERENCES [dbo].[Pets]
        ([PetID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Orders_Pets'
CREATE INDEX [IX_FK_Orders_Pets]
ON [dbo].[Orders]
    ([PetId]);
GO

-- Creating foreign key on [ToppingId] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [FK_Orders_Toppings]
    FOREIGN KEY ([ToppingId])
    REFERENCES [dbo].[Toppings]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Orders_Toppings'
CREATE INDEX [IX_FK_Orders_Toppings]
ON [dbo].[Orders]
    ([ToppingId]);
GO

-- Creating foreign key on [PetCategoryID] in table 'Pets'
ALTER TABLE [dbo].[Pets]
ADD CONSTRAINT [FK_Pets_PetCategory]
    FOREIGN KEY ([PetCategoryID])
    REFERENCES [dbo].[PetCategories]
        ([PetCategoyID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Pets_PetCategory'
CREATE INDEX [IX_FK_Pets_PetCategory]
ON [dbo].[Pets]
    ([PetCategoryID]);
GO

-- Creating foreign key on [CategoryId] in table 'SubCategories'
ALTER TABLE [dbo].[SubCategories]
ADD CONSTRAINT [FK_SubCategory_PetCategories]
    FOREIGN KEY ([CategoryId])
    REFERENCES [dbo].[PetCategories]
        ([PetCategoyID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_SubCategory_PetCategories'
CREATE INDEX [IX_FK_SubCategory_PetCategories]
ON [dbo].[SubCategories]
    ([CategoryId]);
GO

-- Creating foreign key on [SellerID] in table 'Pets'
ALTER TABLE [dbo].[Pets]
ADD CONSTRAINT [FK_Pets_Seller]
    FOREIGN KEY ([SellerID])
    REFERENCES [dbo].[Sellers]
        ([SellerID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Pets_Seller'
CREATE INDEX [IX_FK_Pets_Seller]
ON [dbo].[Pets]
    ([SellerID]);
GO

-- Creating foreign key on [SubCategoryId] in table 'Pets'
ALTER TABLE [dbo].[Pets]
ADD CONSTRAINT [FK_Pets_SubCategory]
    FOREIGN KEY ([SubCategoryId])
    REFERENCES [dbo].[SubCategories]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Pets_SubCategory'
CREATE INDEX [IX_FK_Pets_SubCategory]
ON [dbo].[Pets]
    ([SubCategoryId]);
GO

-- Creating foreign key on [PetID] in table 'PetViews'
ALTER TABLE [dbo].[PetViews]
ADD CONSTRAINT [FK_PetViews_Pets]
    FOREIGN KEY ([PetID])
    REFERENCES [dbo].[Pets]
        ([PetID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [SellerID] in table 'QuotaMessages'
ALTER TABLE [dbo].[QuotaMessages]
ADD CONSTRAINT [FK_QuotaMessage_Seller]
    FOREIGN KEY ([SellerID])
    REFERENCES [dbo].[Sellers]
        ([SellerID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuotaMessage_Seller'
CREATE INDEX [IX_FK_QuotaMessage_Seller]
ON [dbo].[QuotaMessages]
    ([SellerID]);
GO

-- Creating foreign key on [QuotaID] in table 'QuotaReplies'
ALTER TABLE [dbo].[QuotaReplies]
ADD CONSTRAINT [FK_QuotaReply_QuotaMessage]
    FOREIGN KEY ([QuotaID])
    REFERENCES [dbo].[QuotaMessages]
        ([QuotaID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuotaReply_QuotaMessage'
CREATE INDEX [IX_FK_QuotaReply_QuotaMessage]
ON [dbo].[QuotaReplies]
    ([QuotaID]);
GO

-- Creating foreign key on [UserID] in table 'Sellers'
ALTER TABLE [dbo].[Sellers]
ADD CONSTRAINT [FK_Seller_Users]
    FOREIGN KEY ([UserID])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Seller_Users'
CREATE INDEX [IX_FK_Seller_Users]
ON [dbo].[Sellers]
    ([UserID]);
GO

-- Creating foreign key on [UserId] in table 'UserClaims'
ALTER TABLE [dbo].[UserClaims]
ADD CONSTRAINT [FK_dbo_UserClaims_dbo_Users_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_UserClaims_dbo_Users_UserId'
CREATE INDEX [IX_FK_dbo_UserClaims_dbo_Users_UserId]
ON [dbo].[UserClaims]
    ([UserId]);
GO

-- Creating foreign key on [Roles_Id] in table 'UserRoles'
ALTER TABLE [dbo].[UserRoles]
ADD CONSTRAINT [FK_UserRoles_Role]
    FOREIGN KEY ([Roles_Id])
    REFERENCES [dbo].[Roles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Users_Id] in table 'UserRoles'
ALTER TABLE [dbo].[UserRoles]
ADD CONSTRAINT [FK_UserRoles_User]
    FOREIGN KEY ([Users_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserRoles_User'
CREATE INDEX [IX_FK_UserRoles_User]
ON [dbo].[UserRoles]
    ([Users_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------