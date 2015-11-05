__author__ = 'cam'

def sanitizeDescription(desc):
    return desc.lstrip("-")
def parseTimeOccurred(t, d):
    t = t.replace("?","")
    d = d.replace("?","")

    time_occurred = None
    date_occurred = None

    start_occurred = None
    end_occurred = None

    if "at" in t and t.count("at") == 1:
        _date, _time = t.split("at")
        _date = _date.strip()
        _time = _time.rstrip(".").strip()
        time_occurred = _time
        date_occurred = _date
    if "to" in t:
        if "at" in t:
            first, second = t.split("to")

            if "at" in first:
                f_date, f_time = first.split("at")
                f_date = f_date.strip()
                f_time = f_time.rstrip(".").strip()
            else:
                f_date = None
                f_time = None

            if "at" in second:
                s_date, s_time = second.split("at")
                s_date = s_date.strip()
                s_time = s_time.rstrip(".").strip()
            else:
                s_date = None
                s_time = None

            date_occurred = f_date
            time_occurred = f_time if "time reported" not in t else None
            start_occurred = f_time
            end_occurred = s_time
        else:
            start, end = t.split("to")
            start_occurred = start.strip() if "time reported" not in start else None
            end_occurred = end.strip() if "time reported" not in end else None
            time_occurred = t
    if "at" not in t and "to" not in t and "/" not in t:
        time_occurred = t

    if date_occurred == None:
        date_occurred = d

    return [date_occurred, time_occurred, start_occurred, end_occurred]

def toDateTimeFormat(t, d):
    months = "Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec".split()
    year, month, day, hour, minute, second = "","","","","","00"
    if "." in d:
        m,d,y = d.split()
        month = str(months.index(m.strip("."))+1)
        year = y
        day = d.strip(",")
    elif "/" in d:
        month, day, y = d.split("/")
        year = "20" + y

    if len(day) < 2: day = "0" + day
    if len(month) < 2: month = "0" + month

    if t:
        _time, _, meridian = t.partition(" ")
        h,m = _time.split(":")
        hour = int(h)
        minute = m

        if (meridian == "p.m."):
            hour = hour + 12
        hour = str(hour)

        if len(hour) < 2: hour = "0" + hour
        if len(minute) < 2: minute = "0" + minute
    else:
        hour = "00"
        minute = "00"
        second = "00"

    _date = "{0}-{1}-{2}".format(year, month, day)
    _time = "{0}:{1}:{2}".format(hour, minute, second)
    return "{} {}".format(_date, _time)

def process(data):
    last_time_occurred = ""
    new_data = []
    for entry in data:
        if entry["time_occurred"].strip() == "Same":
            entry["time_occurred"] = last_time_occurred
        else:
            last_time_occurred = entry["time_occurred"]
        p_date_occurred, p_time_occurred, p_start_time_occurred, p_end_time_occurred = parseTimeOccurred(entry["time_occurred"], entry["date"])
        # print entry, p_date_occurred, p_time_occurred, p_start_time_occurred, p_end_time_occurred

        occurred_start_obj = toDateTimeFormat(p_start_time_occurred or p_time_occurred, p_date_occurred)
        occurred_end_obj = toDateTimeFormat(p_end_time_occurred or p_start_time_occurred or p_time_occurred, p_date_occurred)
        reported_obj = toDateTimeFormat(entry["time_reported"], entry["date"])
        new_entry = {
            "status": entry["status"],
            "description": sanitizeDescription(entry["description"]),
            "reported": reported_obj,
            "occurred_start": occurred_start_obj,
            "occurred_end": occurred_end_obj,
            "case_no": entry["case_no"],
            "location": entry["location"],
        }
        new_data.append(new_entry)
    return new_data