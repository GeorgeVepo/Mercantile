/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases V7.3.6                     */
/* Target DBMS:           MS SQL Server 2005                              */
/* Project file:          LowTrader.dez                                   */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database creation script                        */
/* Created on:            2019-01-18 21:30                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Add tables                                                             */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add table "dbo.Filtro"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[Filtro] (
    [id_filtro] INTEGER IDENTITY(1,1) NOT NULL,
    [nm_filtro] VARCHAR(250) COLLATE Latin1_General_CI_AS NOT NULL,
    [nu_valor] NUMERIC(18) NOT NULL,
    CONSTRAINT [PK_Filtro] PRIMARY KEY CLUSTERED ([id_filtro])
)
GO


/* ---------------------------------------------------------------------- */
/* Add table "dbo.Produto"                                                */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[Produto] (
    [id_produto] INTEGER IDENTITY(1,1) NOT NULL,
    [nm_produto] VARCHAR(500) COLLATE Latin1_General_CI_AS NOT NULL,
    [id_complementoPesquisa] INTEGER,
    CONSTRAINT [PK_Produto] PRIMARY KEY CLUSTERED ([id_produto])
)
GO


/* ---------------------------------------------------------------------- */
/* Add table "dbo.Produto_Filtro"                                         */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[Produto_Filtro] (
    [id_produto] INTEGER NOT NULL,
    [id_filtro] INTEGER NOT NULL,
    PRIMARY KEY ([id_produto], [id_filtro])
)
GO


/* ---------------------------------------------------------------------- */
/* Add table "dbo.Site"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[Site] (
    [id_site] INTEGER IDENTITY(1,1) NOT NULL,
    [ds_url] VARCHAR(500) COLLATE Latin1_General_CI_AS NOT NULL,
    [ds_login] VARCHAR(255) COLLATE Latin1_General_CI_AS,
    [ds_senha] VARCHAR(255) COLLATE Latin1_General_CI_AS,
    CONSTRAINT [PK_Site] PRIMARY KEY CLUSTERED ([id_site])
)
GO


/* ---------------------------------------------------------------------- */
/* Add table "dbo.ComplementoPesquisa"                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[ComplementoPesquisa] (
    [id_complementoPesquisa] INTEGER IDENTITY(1,1) NOT NULL,
    [ds_complemento] VARCHAR(255) COLLATE Latin1_General_CI_AS NOT NULL,
    [id_produto] INTEGER,
    CONSTRAINT [PK_ComplementoPesquisa] PRIMARY KEY CLUSTERED ([id_complementoPesquisa])
)
GO


/* ---------------------------------------------------------------------- */
/* Add table "dbo.Oferta"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE [dbo].[Oferta] (
    [id_oferta] INTEGER NOT NULL,
    [nu_valor] SMALLMONEY NOT NULL,
    [st_oferta] DATETIME NOT NULL,
    [id_produto] INTEGER,
    CONSTRAINT [PK_Oferta] PRIMARY KEY CLUSTERED ([id_oferta])
)
GO


/* ---------------------------------------------------------------------- */
/* Add foreign key constraints                                            */
/* ---------------------------------------------------------------------- */

ALTER TABLE [dbo].[ComplementoPesquisa] ADD CONSTRAINT [Produto_ComplementoPesquisa] 
    FOREIGN KEY ([id_produto]) REFERENCES [dbo].[Produto] ([id_produto])
GO


ALTER TABLE [dbo].[Oferta] ADD CONSTRAINT [Produto_Oferta] 
    FOREIGN KEY ([id_produto]) REFERENCES [dbo].[Produto] ([id_produto])
GO


ALTER TABLE [dbo].[Produto_Filtro] ADD CONSTRAINT [Produto_Produto_Filtro] 
    FOREIGN KEY ([id_produto]) REFERENCES [dbo].[Produto] ([id_produto])
GO


ALTER TABLE [dbo].[Produto_Filtro] ADD CONSTRAINT [Filtro_Produto_Filtro] 
    FOREIGN KEY ([id_filtro]) REFERENCES [dbo].[Filtro] ([id_filtro])
GO

