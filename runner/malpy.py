import re
import sys


# Malayalam (.mal) → Python (.py)
def translate_mallang(code):
    string_pattern = re.compile(r'"[^"]*"')
    strings = string_pattern.findall(code)
    code_no_strings = string_pattern.sub("___STRING___", code)

    # Function definitions
    code_no_strings = re.sub(
        r"ith\s+(\w+)\s*\((.*?)\)\s*:", r"def \1(\2):", code_no_strings
    )

    # Variable assignments
    code_no_strings = re.sub(r'(\w+)\s+"([^"]*)"\s+aanu', r'\1 = "\2"', code_no_strings)
    code_no_strings = re.sub(r"(\w+)\s+(\S+)\s+aanu", r"\1 = \2", code_no_strings)

    # Conditionals
    code_no_strings = re.sub(
        r"(\w+)\s+(\S+)\s+aanengil:", r"if \1 == \2:", code_no_strings
    )
    code_no_strings = re.sub(
        r"athupole\s+(\w+)\s+(\S+)\s+aayal:", r"elif \1 == \2:", code_no_strings
    )
    code_no_strings = re.sub(r"allengil:", r"else:", code_no_strings)

    # Return and print
    code_no_strings = re.sub(r"(\S+)\s+vitto", r"return \1", code_no_strings)
    code_no_strings = re.sub(r"\bvitto\b", r"return", code_no_strings)
    code_no_strings = re.sub(r"kaanikyuka\s+(.*)", r"print(\1)", code_no_strings)

    # Restore strings
    final_code = code_no_strings
    for s in strings:
        final_code = final_code.replace("___STRING___", s, 1)

    return final_code


# Python (.py) → Malayalam (.mal)
def translate_python(code):
    result = code
    result = re.sub(r"def\s+(\w+)\((.*?)\):", r"ith \1(\2):", result)
    result = re.sub(r"if\s+(\w+)\s*==\s*(\S+):", r"\1 \2 aanengil:", result)
    result = re.sub(r"elif\s+(\w+)\s*==\s*(\S+):", r"athupole \1 \2 aayal:", result)
    result = re.sub(r"else:", r"allengil:", result)
    result = re.sub(r"print\((.*)\)", r"kaanikyuka \1", result)
    result = re.sub(r'(\w+)\s*=\s*"([^"]*)"', r'\1 "\2" aanu', result)
    result = re.sub(r"(\w+)\s*=\s*(\S+)", r"\1 \2 aanu", result)
    result = re.sub(r"return\s+(\S+)", r"\1 vitto", result)
    result = re.sub(r"\breturn\b", r"vitto", result)
    return result


# For CLI usage
def run_mallang(file_path):
    with open(file_path, "r") as file:
        mal_code = file.read()
    py_code = translate_mallang(mal_code)
    exec(py_code)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage:")
        print(
            "  python malpy.py to_py <input_file.mal>   # Translate Malayalam to Python"
        )
        print(
            "  python malpy.py to_mal <input_file.py>    # Translate Python to Malayalam"
        )
        print("  python malpy.py run <input_file.mal>      # Run Malayalam code")
        sys.exit(1)

    mode = sys.argv[1]
    file_path = sys.argv[2]

    with open(file_path, "r") as f:
        code = f.read()

    if mode == "to_py":
        print(translate_mallang(code))
    elif mode == "to_mal":
        print(translate_python(code))
    elif mode == "run":
        run_mallang(file_path)
    else:
        print("Invalid mode. Use to_py / to_mal / run.")
