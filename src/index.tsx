import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleApply = (params: ArticleStateType) => {
		setArticleState(params);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		const mainElement = document.querySelector('main') as HTMLElement;
		mainElement.style.setProperty(
			'--font-family',
			articleState.fontFamilyOption.value
		);
		mainElement.style.setProperty(
			'--font-size',
			articleState.fontSizeOption.value
		);
		mainElement.style.setProperty('--font-color', articleState.fontColor.value);
		mainElement.style.setProperty(
			'--container-width',
			articleState.contentWidth.value
		);
		mainElement.style.setProperty(
			'--bg-color',
			articleState.backgroundColor.value
		);
	}, [articleState]);

	return (
		<main className={clsx(styles.main)}>
			<ArticleParamsForm
				initialState={formState}
				onApply={handleApply}
				onReset={handleReset}
				setFormState={setFormState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
