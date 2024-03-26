import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  estado: string;
  subtitle: string;
  buttonText?: string;
  onClickButton?: () => void;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  estado,
  subtitle,
  buttonText,
  onClickButton,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h5 className="text-title-sm font-bold text-black dark:text-white">
            {estado}
          </h5>
          <div className="flex flex-col"> 
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs text-gray-500">{subtitle}</span>
          </div>
        </div>
      </div>

      {buttonText && onClickButton && (
        <button
          className="mt-2 bg-primary text-white px-3 py-1 rounded-md hover:bg-opacity-90"
          onClick={onClickButton}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default CardDataStats;
