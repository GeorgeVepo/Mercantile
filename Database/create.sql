USE [Mercantile]
GO
/****** Object:  Table [dbo].[Filtro]    Script Date: 06/04/2019 21:07:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Filtro](
	[id_filtro] [int] IDENTITY(1,1) NOT NULL,
	[nm_filtro] [varchar](250) NOT NULL,
	[ds_valor] [varchar](250) NOT NULL,
 CONSTRAINT [PK_Filtro] PRIMARY KEY CLUSTERED 
(
	[id_filtro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Oferta]    Script Date: 06/04/2019 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Oferta](
	[id_oferta] [int] IDENTITY(1,1) NOT NULL,
	[nu_preco] [smallmoney] NOT NULL,
	[dt_oferta] [datetime] NOT NULL,
	[ds_url] [varchar](2000) NOT NULL,
	[id_produto] [int] NULL,
 CONSTRAINT [PK_Oferta] PRIMARY KEY CLUSTERED 
(
	[id_oferta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produto]    Script Date: 06/04/2019 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[id_produto] [int] IDENTITY(1,1) NOT NULL,
	[nm_produto] [varchar](500) NOT NULL,
	[nu_porcentagemMinimaDeLucro] [numeric](6, 3) NULL,
 CONSTRAINT [PK_Produto] PRIMARY KEY CLUSTERED 
(
	[id_produto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Site]    Script Date: 06/04/2019 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Site](
	[id_site] [int] IDENTITY(1,1) NOT NULL,
	[nm_site] [varchar](500) NOT NULL,
	[ds_url] [varchar](1000) NOT NULL,
	[ds_login] [varchar](255) NULL,
	[ds_senha] [varchar](255) NULL,
	[fl_ativo] [bit] NOT NULL,
 CONSTRAINT [PK_Site] PRIMARY KEY CLUSTERED 
(
	[id_site] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Site_Produto_Filtro]    Script Date: 06/04/2019 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Site_Produto_Filtro](
	[id_site] [int] NOT NULL,
	[id_produto] [int] NOT NULL,
	[id_filtro] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_produto] ASC,
	[id_filtro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Filtro] ON 

INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (1, N'nomeProduto', N'galaxy-s9-plus-128gb')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (2, N'ordenacao', N'PRICE')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (3, N'ItemTypeID', N'N')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (4, N'priceRange', N'2400-0')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (5, N'melhoresVendedores', N'YES')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (9, N'tituloNaoPermitido', N'usado')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (10, N'tituloObrigatorio', N'S9')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (11, N'tituloObrigatorio', N'plus')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (12, N'tituloObrigatorio', N'128')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (13, N'categoria', N'celular')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (14, N'nomeProduto', N'smartphone-samsung-galaxy-s9-plus-sm-g9650-128gb')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (15, N'ordem', N'2#price')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (16, N'nomeProduto', N'tablet-samsung-galaxy-tab-a-sm-t285-8gb-3g-4g')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (17, N'ordenacao', N'PRICE')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (18, N'ItemTypeID', N'N')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (19, N'priceRange', N'500-800')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (20, N'melhoresVendedores', N'YES')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (21, N'tituloNaoPermitido', N'usado')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (22, N'tituloObrigatorio', N't285')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (23, N'tituloObrigatorio', N'7')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (24, N'categoria', N'tablet-ipad')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (25, N'nomeProduto', N'tablet-samsung-galaxy-tab-a-sm-t285-8gb-7-android?__zaf_=samsung%7C%7C_o%3A11')
INSERT [dbo].[Filtro] ([id_filtro], [nm_filtro], [ds_valor]) VALUES (26, N'ordem', N'12#price')
SET IDENTITY_INSERT [dbo].[Filtro] OFF
SET IDENTITY_INSERT [dbo].[Produto] ON 

INSERT [dbo].[Produto] ([id_produto], [nm_produto], [nu_porcentagemMinimaDeLucro]) VALUES (1, N'Sansung galaxy S9 plus 128 gb', CAST(1.000 AS Numeric(6, 3)))
INSERT [dbo].[Produto] ([id_produto], [nm_produto], [nu_porcentagemMinimaDeLucro]) VALUES (2, N'Tablet Samsung Galaxy Tab E SM-T560 8GB 9,6" Android', CAST(1.000 AS Numeric(6, 3)))
SET IDENTITY_INSERT [dbo].[Produto] OFF
SET IDENTITY_INSERT [dbo].[Site] ON 

INSERT [dbo].[Site] ([id_site], [nm_site], [ds_url], [ds_login], [ds_senha], [fl_ativo]) VALUES (1, N'Mercado Livre', N'https://lista.mercadolivre.com.br/{0}_OrderId_{1}_ItemTypeID_{2}_PriceRange_{3}_BestSellers_{4}', N'', N'', 1)
INSERT [dbo].[Site] ([id_site], [nm_site], [ds_url], [ds_login], [ds_senha], [fl_ativo]) VALUES (2, N'ZOOM', N'https://www.zoom.com.br/{0}/{1}?resultorder={2}', NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[Site] OFF
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 1)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 2)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 3)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 4)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 5)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 9)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 10)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 11)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 1, 12)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 1, 13)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 1, 14)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 1, 15)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 16)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 17)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 18)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 19)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 20)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 21)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 22)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (1, 2, 23)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 2, 24)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 2, 25)
INSERT [dbo].[Site_Produto_Filtro] ([id_site], [id_produto], [id_filtro]) VALUES (2, 2, 26)
ALTER TABLE [dbo].[Site] ADD  CONSTRAINT [DF_Site_fl_ativo]  DEFAULT ((0)) FOR [fl_ativo]
GO
ALTER TABLE [dbo].[Oferta]  WITH CHECK ADD  CONSTRAINT [Produto_Oferta] FOREIGN KEY([id_produto])
REFERENCES [dbo].[Produto] ([id_produto])
GO
ALTER TABLE [dbo].[Oferta] CHECK CONSTRAINT [Produto_Oferta]
GO
ALTER TABLE [dbo].[Site_Produto_Filtro]  WITH CHECK ADD  CONSTRAINT [FK_Filtro] FOREIGN KEY([id_filtro])
REFERENCES [dbo].[Filtro] ([id_filtro])
GO
ALTER TABLE [dbo].[Site_Produto_Filtro] CHECK CONSTRAINT [FK_Filtro]
GO
ALTER TABLE [dbo].[Site_Produto_Filtro]  WITH CHECK ADD  CONSTRAINT [FK_Produto] FOREIGN KEY([id_produto])
REFERENCES [dbo].[Produto] ([id_produto])
GO
ALTER TABLE [dbo].[Site_Produto_Filtro] CHECK CONSTRAINT [FK_Produto]
GO
ALTER TABLE [dbo].[Site_Produto_Filtro]  WITH CHECK ADD  CONSTRAINT [FK_Site] FOREIGN KEY([id_site])
REFERENCES [dbo].[Site] ([id_site])
GO
ALTER TABLE [dbo].[Site_Produto_Filtro] CHECK CONSTRAINT [FK_Site]
GO
