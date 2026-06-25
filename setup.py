from setuptools import setup, find_packages
import os
import shutil

# Copy Node project files into aether_pip/node_project for clean packaging
dest_dir = os.path.join('aether_pip', 'node_project')
if os.path.exists(dest_dir):
    shutil.rmtree(dest_dir)
os.makedirs(dest_dir)

# Copy directories
shutil.copytree('bin', os.path.join(dest_dir, 'bin'))
shutil.copytree('src', os.path.join(dest_dir, 'src'))
shutil.copyfile('package.json', os.path.join(dest_dir, 'package.json'))
if os.path.exists('package-lock.json'):
    shutil.copyfile('package-lock.json', os.path.join(dest_dir, 'package-lock.json'))

def package_files(directory):
    paths = []
    for (path, directories, filenames) in os.walk(directory):
        for filename in filenames:
            rel_path = os.path.relpath(os.path.join(path, filename), 'aether_pip')
            paths.append(rel_path)
    return paths

setup(
    name="aether-ai-cli",
    version="1.0.0",
    author="Krishiv PB",
    author_email="krylobloxyt@gmail.com",
    description="Aether Core AI v110 — Universal AI Gateway CLI (Python Wrapper)",
    long_description=open("README.md", "r", encoding="utf-8").read() if os.path.exists("README.md") else "",
    long_description_content_type="text/markdown",
    url="https://github.com/Krylo-60/aether-ai-cli",
    packages=find_packages(),
    package_data={
        "aether_pip": package_files(os.path.join('aether_pip', 'node_project')),
    },
    include_package_data=True,
    entry_points={
        "console_scripts": [
            "aether-pip=aether_pip.cli:main",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)
