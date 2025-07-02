import { useState, useEffect } from 'react';
import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

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
		<main className={styles.main}>
			<ArticleParamsForm
				initialState={articleState}
				onApply={setArticleState}
				onReset={() => setArticleState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};
