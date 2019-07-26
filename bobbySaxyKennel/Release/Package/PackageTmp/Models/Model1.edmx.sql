
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/07/2019 20:04:33
-- Generated from EDMX file: D:\ProJects\pizzaKennel\bobbySaxyKennel\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [pizzaDb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_Customer_Users]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Customer] DROP CONSTRAINT [FK_Customer_Users];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_Logins_dbo_Users_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Logins] DROP CONSTRAINT [FK_dbo_Logins_dbo_Users_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_UserClaims_dbo_Users_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserClaims] DROP CONSTRAINT [FK_dbo_UserClaims_dbo_Users_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_UserRoles_dbo_Roles_RoleId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_dbo_UserRoles_dbo_Roles_RoleId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_UserRoles_dbo_Users_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_dbo_UserRoles_dbo_Users_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_Pets_PetCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pets] DROP CONSTRAINT [FK_Pets_PetCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_Pets_Seller]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pets] DROP CONSTRAINT [FK_Pets_Seller];
GO
IF OBJECT_ID(N'[dbo].[FK_PetViews_Pets]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PetViews] DROP CONSTRAINT [FK_PetViews_Pets];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaMessage_Customer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaMessage] DROP CONSTRAINT [FK_QuotaMessage_Customer];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaMessage_Seller]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaMessage] DROP CONSTRAINT [FK_QuotaMessage_Seller];
GO
IF OBJECT_ID(N'[dbo].[FK_QuotaReply_QuotaMessage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuotaReply] DROP CONSTRAINT [FK_QuotaReply_QuotaMessage];
GO
IF OBJECT_ID(N'[dbo].[FK_Seller_Users]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Seller] DROP CONSTRAINT [FK_Seller_Users];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[Contact]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Contact];
GO
IF OBJECT_ID(N'[dbo].[Customer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Customer];
GO
IF OBJECT_ID(N'[dbo].[Logins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Logins];
GO
IF OBJECT_ID(N'[dbo].[PetCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PetCategory];
GO
IF OBJECT_ID(N'[dbo].[Pets]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Pets];
GO
IF OBJECT_ID(N'[dbo].[PetViews]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PetViews];
GO
IF OBJECT_ID(N'[dbo].[QuotaMessage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuotaMessage];
GO
IF OBJECT_ID(N'[dbo].[QuotaReply]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuotaReply];
GO
IF OBJECT_ID(N'[dbo].[Roles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Roles];
GO
IF OBJECT_ID(N'[dbo].[Seller]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Seller];
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

-- Creating table 'Logins'
CREATE TABLE [dbo].[Logins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'PetCategories'
CREATE TABLE [dbo].[PetCategories] (
    [PetCategoyID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(30)  NOT NULL,
    [Description] varchar(300)  NOT NULL
);
GO

-- Creating table 'Pets'
CREATE TABLE [dbo].[Pets] (
    [PetID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(50)  NOT NULL,
    [Description] varchar(300)  NOT NULL,
    [Amount] decimal(19,4)  NOT NULL,
    [SellerID] int  NOT NULL,
    [ImgLocation] varchar(max)  NOT NULL,
    [PetCategoryID] int  NOT NULL,
    [Datetime] datetime  NULL,
    [ImgName] varchar(200)  NOT NULL
);
GO

-- Creating table 'PetViews'
CREATE TABLE [dbo].[PetViews] (
    [PetID] int  NOT NULL,
    [NoOfViews] int  NOT NULL
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

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'Logins'
ALTER TABLE [dbo].[Logins]
ADD CONSTRAINT [PK_Logins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
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

-- Creating foreign key on [SellerID] in table 'Pets'
ALTER TABLE [dbo].[Pets]
ADD CONSTRAINT [FK_Pets_Seller]
    FOREIGN KEY ([SellerID])
    REFERENCES [dbo].[Sellers]
        ([SellerID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Pets_Seller'
CREATE INDEX [IX_FK_Pets_Seller]
ON [dbo].[Pets]
    ([SellerID]);
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
ADD CONSTRAINT [FK_UserRoles_Roles]
    FOREIGN KEY ([Roles_Id])
    REFERENCES [dbo].[Roles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Users_Id] in table 'UserRoles'
ALTER TABLE [dbo].[UserRoles]
ADD CONSTRAINT [FK_UserRoles_Users]
    FOREIGN KEY ([Users_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserRoles_Users'
CREATE INDEX [IX_FK_UserRoles_Users]
ON [dbo].[UserRoles]
    ([Users_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------