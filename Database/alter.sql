/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases V7.3.6                     */
/* Target DBMS:           MS SQL Server 2005                              */
/* Project file:          LowTrader.dez                                   */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Alter database script                           */
/* Created on:            2019-01-18 21:31                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Drop foreign key constraints                                           */
/* ---------------------------------------------------------------------- */

ALTER TABLE [dbo].[Produto_Filtro] DROP CONSTRAINT [Produto_Produto_Filtro]
GO


ALTER TABLE [dbo].[Produto_Filtro] DROP CONSTRAINT [Filtro_Produto_Filtro]
GO


/* ---------------------------------------------------------------------- */
/* Alter table "dbo.Produto_Filtro"                                       */
/* ---------------------------------------------------------------------- */

ALTER TABLE [dbo].[Produto_Filtro] ADD
    PRIMARY KEY ([id_produto], [id_filtro])
GO


/* ---------------------------------------------------------------------- */
/* Add foreign key constraints                                            */
/* ---------------------------------------------------------------------- */

ALTER TABLE [dbo].[Produto_Filtro] ADD CONSTRAINT [Produto_Produto_Filtro] 
    FOREIGN KEY ([id_produto]) REFERENCES [dbo].[Produto] ([id_produto])
GO


ALTER TABLE [dbo].[Produto_Filtro] ADD CONSTRAINT [Filtro_Produto_Filtro] 
    FOREIGN KEY ([id_filtro]) REFERENCES [dbo].[Filtro] ([id_filtro])
GO

