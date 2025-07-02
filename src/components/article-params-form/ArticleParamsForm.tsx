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
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [localFormState, setLocalFormState] =
		useState<ArticleStateType>(initialState);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;
		setLocalFormState(initialState);
	}, [initialState, isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				arrowButtonRef.current &&
				!sidebarRef.current.contains(e.target as Node) &&
				!arrowButtonRef.current.contains(e.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMenuOpen]);

	const toggleSidebar = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleFieldChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setLocalFormState((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(localFormState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setLocalFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleSidebar} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
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
