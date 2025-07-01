import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
	setFormState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
	setFormState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localFormState, setLocalFormState] =
		useState<ArticleStateType>(initialState);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLocalFormState(initialState);
	}, [initialState]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				arrowButtonRef.current &&
				!sidebarRef.current.contains(e.target as Node) &&
				!arrowButtonRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleFieldChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			const newState = { ...localFormState, [field]: value };
			setLocalFormState(newState);
			setFormState(newState);
		};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(localFormState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setLocalFormState(defaultArticleState);
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={localFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFieldChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeOption'
						selected={localFormState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFieldChange('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						selected={localFormState.fontColor}
						options={fontColors}
						onChange={handleFieldChange('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={localFormState.backgroundColor}
						options={backgroundColors}
						onChange={handleFieldChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						selected={localFormState.contentWidth}
						options={contentWidthArr}
						onChange={handleFieldChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
