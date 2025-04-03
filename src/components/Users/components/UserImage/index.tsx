interface UserImageProps {
  src: string | undefined;
  alt: string;
  status: boolean;
}

export const UserImage: React.FC<UserImageProps> = ({ status, src, alt }) => {
  return (
    <div className="w-8 h-8 rounded-full ms-2  relative">
      <img src={src} alt={alt} className="w-8 h-8 rounded-full" />
      <span
        className={`absolute bottom-1 right-[0] w-[6px] h-[6px]  rounded-full border border-white ${
          status ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
    </div>
  );
};
