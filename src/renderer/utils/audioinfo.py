import os
import eyed3
import sys

def get_voice_time_secs(file_path):
    """
    获取音频文件时长
    :param file_path 文件的路径
    """
    voice_file = eyed3.load(file_path)
    # 获取音频时长
    secs = int(voice_file.info.time_secs)
    return secs

if __name__ == '__main__':
    print(int(get_voice_time_secs(sys.argv[1])))
    

