USE [AnyDoDB]
GO

/****** Object:  Table [dbo].[MyTask]    Script Date: 01.08.2016 11:11:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MyTask](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CategoryId] [int] NULL,
	[HighPriority] [bit] NOT NULL,
	[TimeId] [int] NOT NULL,
	[CreationDate] [datetime] NULL,
 CONSTRAINT [PK__MyTask__3214EC079DB3C94D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[MyTask] ADD  CONSTRAINT [DF_MyTask_HighPriority]  DEFAULT ((0)) FOR [HighPriority]
GO

ALTER TABLE [dbo].[MyTask] ADD  DEFAULT ((1)) FOR [TimeId]
GO

ALTER TABLE [dbo].[MyTask]  WITH CHECK ADD  CONSTRAINT [FK__MyTask__CategoryId__2D27B809] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[MyTask] CHECK CONSTRAINT [FK__MyTask__CategoryId__2D27B809]
GO

ALTER TABLE [dbo].[MyTask]  WITH CHECK ADD  CONSTRAINT [FK_MyTask_ToTable] FOREIGN KEY([TimeId])
REFERENCES [dbo].[Time] ([Id])
GO

ALTER TABLE [dbo].[MyTask] CHECK CONSTRAINT [FK_MyTask_ToTable]
GO

