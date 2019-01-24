USE [LowTrader]
GO
/****** Object:  Table [dbo].[ComplementoPesquisa]    Script Date: 23/01/2019 23:29:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComplementoPesquisa](
	[id_complementoPesquisa] [int] IDENTITY(1,1) NOT NULL,
	[ds_complemento] [varchar](255) NOT NULL,
	[id_produto] [int] NULL,
 CONSTRAINT [PK_ComplementoPesquisa] PRIMARY KEY CLUSTERED 
(
	[id_complementoPesquisa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Filtro]    Script Date: 23/01/2019 23:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Filtro](
	[id_filtro] [int] IDENTITY(1,1) NOT NULL,
	[nm_filtro] [varchar](250) NOT NULL,
	[nu_valor] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_Filtro] PRIMARY KEY CLUSTERED 
(
	[id_filtro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Oferta]    Script Date: 23/01/2019 23:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Oferta](
	[id_oferta] [int] NOT NULL,
	[nu_valor] [smallmoney] NOT NULL,
	[st_oferta] [datetime] NOT NULL,
	[id_produto] [int] NULL,
 CONSTRAINT [PK_Oferta] PRIMARY KEY CLUSTERED 
(
	[id_oferta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produto]    Script Date: 23/01/2019 23:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[id_produto] [int] IDENTITY(1,1) NOT NULL,
	[nm_produto] [varchar](500) NOT NULL,
	[id_complementoPesquisa] [int] NULL,
 CONSTRAINT [PK_Produto] PRIMARY KEY CLUSTERED 
(
	[id_produto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produto_Filtro]    Script Date: 23/01/2019 23:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto_Filtro](
	[id_produto] [int] NOT NULL,
	[id_filtro] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_produto] ASC,
	[id_filtro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Site]    Script Date: 23/01/2019 23:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Site](
	[id_site] [int] IDENTITY(1,1) NOT NULL,
	[ds_url] [varchar](500) NOT NULL,
	[ds_login] [varchar](255) NULL,
	[ds_senha] [varchar](255) NULL,
 CONSTRAINT [PK_Site] PRIMARY KEY CLUSTERED 
(
	[id_site] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ComplementoPesquisa]  WITH CHECK ADD  CONSTRAINT [Produto_ComplementoPesquisa] FOREIGN KEY([id_produto])
REFERENCES [dbo].[Produto] ([id_produto])
GO
ALTER TABLE [dbo].[ComplementoPesquisa] CHECK CONSTRAINT [Produto_ComplementoPesquisa]
GO
ALTER TABLE [dbo].[Oferta]  WITH CHECK ADD  CONSTRAINT [Produto_Oferta] FOREIGN KEY([id_produto])
REFERENCES [dbo].[Produto] ([id_produto])
GO
ALTER TABLE [dbo].[Oferta] CHECK CONSTRAINT [Produto_Oferta]
GO
ALTER TABLE [dbo].[Produto_Filtro]  WITH CHECK ADD  CONSTRAINT [Filtro_Produto_Filtro] FOREIGN KEY([id_filtro])
REFERENCES [dbo].[Filtro] ([id_filtro])
GO
ALTER TABLE [dbo].[Produto_Filtro] CHECK CONSTRAINT [Filtro_Produto_Filtro]
GO
ALTER TABLE [dbo].[Produto_Filtro]  WITH CHECK ADD  CONSTRAINT [Produto_Produto_Filtro] FOREIGN KEY([id_produto])
REFERENCES [dbo].[Produto] ([id_produto])
GO
ALTER TABLE [dbo].[Produto_Filtro] CHECK CONSTRAINT [Produto_Produto_Filtro]
GO
