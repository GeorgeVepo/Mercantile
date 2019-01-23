/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases V7.3.6                     */
/* Target DBMS:           MS SQL Server 2005                              */
/* Project file:          LowTrader.dez                                   */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database drop script                            */
/* Created on:            2019-01-18 21:30                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Drop foreign key constraints                                           */
/* ---------------------------------------------------------------------- */

ALTER TABLE [dbo].[ComplementoPesquisa] DROP CONSTRAINT [Produto_ComplementoPesquisa]
GO


ALTER TABLE [dbo].[Oferta] DROP CONSTRAINT [Produto_Oferta]
GO


ALTER TABLE [dbo].[Produto_Filtro] DROP CONSTRAINT [Produto_Produto_Filtro]
GO


ALTER TABLE [dbo].[Produto_Filtro] DROP CONSTRAINT [Filtro_Produto_Filtro]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.Oferta"                                                */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[Oferta] DROP CONSTRAINT [PK_Oferta]
GO


DROP TABLE [dbo].[Oferta]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.ComplementoPesquisa"                                   */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[ComplementoPesquisa] DROP CONSTRAINT [PK_ComplementoPesquisa]
GO


DROP TABLE [dbo].[ComplementoPesquisa]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.Site"                                                  */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[Site] DROP CONSTRAINT [PK_Site]
GO


DROP TABLE [dbo].[Site]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.Produto_Filtro"                                        */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[Produto_Filtro] DROP CONSTRAINT 
GO


DROP TABLE [dbo].[Produto_Filtro]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.Produto"                                               */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[Produto] DROP CONSTRAINT [PK_Produto]
GO


DROP TABLE [dbo].[Produto]
GO


/* ---------------------------------------------------------------------- */
/* Drop table "dbo.Filtro"                                                */
/* ---------------------------------------------------------------------- */

/* Drop constraints */

ALTER TABLE [dbo].[Filtro] DROP CONSTRAINT [PK_Filtro]
GO


DROP TABLE [dbo].[Filtro]
GO

